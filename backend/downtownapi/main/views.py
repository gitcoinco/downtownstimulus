from .permissions import UserPermission, BusinessPermission, DonationPermission
from .utils import account_activation_token, calculate_clr_match
from .serializers import UserSerializer, BusinessSerializer, DonationSerializer, CLRManySerializer, LoginTokenSerializer
from .models import User, Business, Donation
from django.http import HttpResponse
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import status
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import mixins
from django.shortcuts import render
import json
import csv
import io

import stripe
stripe.api_key = 'sk_test_51GqkJHIvBq7cPOzZGDx0sDolQSjRI8JxEaXCtv9OYAHyVmIFiOSD40ZLeUxrqbtQbVO1hZ2GyPLbahO0slTk05v900S87oiMhQ'


# Create your views here.


class RootView(APIView):
    def get(self, request):
        resp = {
            'title': 'Gitcoin Downtown Stimulus API'
        }
        return Response(json.dumps(resp), status=status.HTTP_201_CREATED)


class UserList(mixins.ListModelMixin,
               mixins.CreateModelMixin,
               generics.GenericAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = (UserPermission,)
    # authentication_classes = [TokenAuthentication]

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class UserListDetail(mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin,
                     mixins.DestroyModelMixin,
                     generics.GenericAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = (UserPermission,)
    # authentication_classes = [TokenAuthentication]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class BusinessList(mixins.ListModelMixin,
                   mixins.CreateModelMixin,
                   generics.GenericAPIView):

    queryset = Business.objects.all()
    serializer_class = BusinessSerializer
    # permission_classes = (BusinessPermission,)
    # authentication_classes = [TokenAuthentication]

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class BusinessListDetail(mixins.RetrieveModelMixin,
                         mixins.UpdateModelMixin,
                         mixins.DestroyModelMixin,
                         generics.GenericAPIView):

    queryset = Business.objects.all()
    serializer_class = BusinessSerializer
    # permission_classes = (BusinessPermission,)
    # authentication_classes = [TokenAuthentication]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class DonationList(mixins.ListModelMixin,
                   generics.GenericAPIView):

    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    # permission_classes = (DonationPermission, )
    # authentication_classes = [TokenAuthentication]

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        payload = request.body
        signature = request.headers.get("Stripe-Signature")
        try:
            event = stripe.Webhook.construct_event(
                payload=payload, sig_header=signature, secret='whsec_qZMKGvPr7n8HWnywm5eDJO7e8P0vRAKT'
            )
            print(event.keys())
            print(event['data'])
        except ValueError as e:
            # Invalid payload.
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except stripe.error.SignatureVerificationError as e:
            # Invalid Signature.
            print(e, signature, 'whsec_qZMKGvPr7n8HWnywm5eDJO7e8P0vRAKT', payload)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        # return self.create(request, *args, **kwargs)

        if event["type"] == "payment_intent.succeeded":
            payment_intent = event["data"]["object"]
            # connected_account_id = event["account"]
            connected_account_id = 'acct_1GqkJHIvBq7cPOzZ'

            transaction_id = payment_intent['id']
            donation_amount = int(payment_intent['amount']) / 100
            user_email = payment_intent['charges']['data']['billing_details']['email']

            try:
                user = User.objects.get(email=user_email)
            except ObjectDoesNotExist as e:
                print('No User Found for this Payment Intent', e)
                return Response(json.dumps({"success": False}), status=status.HTTP_406_NOT_ACCEPTABLE)

            try:
                business = Business.objects.get(stripe_id=connected_account_id)
            except ObjectDoesNotExist as e:
                print('No SUch Business Found')
                return Response(json.dumps({"success": False}), status=status.HTTP_406_NOT_ACCEPTABLE)

            if user and business:

                clr_match_amount, business_total_matched_clr_amount = calculate_clr_match(
                    user.id, business.id, donation_amount)

                donation_obj = Donation(
                    round_number=1,
                    donation_amount=donation_amount,
                    donor=user,
                    recipient=business,
                    transaction_id=transaction_id,
                    match=clr_match_amount,
                    donation_status="Success"
                )

                donation_obj.save()

                business.current_clr_matching_amount = business_total_matched_clr_amount
                business_current_donation = business.donation_received
                business_new_donation = business_current_donation + donation_amount
                business.donation_received = business_new_donation

                business.save()

        return Response(json.dumps({"success": True}), status=status.HTTP_201_CREATED)


class DonationListDetail(mixins.RetrieveModelMixin,
                         mixins.UpdateModelMixin,
                         mixins.DestroyModelMixin,
                         generics.GenericAPIView):

    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    # permission_classes = (DonationPermission,)
    # authentication_classes = [TokenAuthentication]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


class CLRCalculation(generics.GenericAPIView):

    serializer_class = CLRManySerializer

    def post(self, request):
        serialized_data = CLRManySerializer(data=request.data)
        if serialized_data.is_valid(raise_exception=True):
            clr_objs = serialized_data.validated_data.get('clr_objs')
            clr_matches = []
            for obj in clr_objs:
                user_id = obj.get('user_id')
                business_id = obj.get('business_id')
                donation_amount = obj.get('donation_amount')

                user_match_amount, business_matched_clr_amount = calculate_clr_match(
                    user_id, business_id, donation_amount)
                print(user_match_amount, business_matched_clr_amount)
                clr_matches.append(user_match_amount)

            return Response(json.dumps({'clr_data': clr_matches}), status=status.HTTP_201_CREATED)


def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_email_verified = True
        user.save()
        # return redirect('home')
        return HttpResponse('Thank you for your email confirmation. Now you can login your account.')
    else:
        return HttpResponse('Activation link is invalid!')


class CustomAuthToken(ObtainAuthToken):

    serializer_class = LoginTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = LoginTokenSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'id': user.pk,
                'email': user.email,
                'phone_number': user.phone_number,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'profile_pic': user.profile_pic,
            })


def add_business_csv(request):
    if request.method == 'GET':
        return render(request, 'add_business_csv.html')
    if request.method == "POST":
        csv_file = request.FILES['file']
        data_set = csv_file.read().decode('UTF-8')
        io_string = io.StringIO(data_set)

        for count, row in enumerate(csv.reader(io_string, delimiter=',')):
            if count == 0 or count == 1:
                continue
            print('row', row[9])
            business = Business(
                name=row[2],
                owner_email=row[1],
                short_description=row[3],
                history=row[7],
                covid_story=row[8],
                expenditure_details=row[9].strip().split(','),
                other_content=row[15],
                website_link=row[4],
                facebook_profile_link=row[5],
                instagram_profile_link=row[6],
                stripe_id="",
                logo=row[10],
                cover_image=row[11],
                main_business_image=row[11],
                staff_images=[row[12]],
            )
            business.save()

        return HttpResponse('Data Uploaded')
