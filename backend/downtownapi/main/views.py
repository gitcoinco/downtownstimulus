import json

from django.shortcuts import render
from rest_framework import mixins
from rest_framework import generics
from rest_framework.views import APIView

from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework import status

from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_text

from .models import User, Business, Donation
from .serializers import UserSerializer, BusinessSerializer, DonationSerializer, CLRCalculationSeriaziler
from .utils import translate_data, aggregate_contributions, calculate_clr, calculate_live_clr, account_activation_token

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

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class DonationList(mixins.ListModelMixin,
                   mixins.CreateModelMixin,
                   generics.GenericAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class DonationListDetail(mixins.RetrieveModelMixin,
                         mixins.UpdateModelMixin,
                         mixins.DestroyModelMixin,
                         generics.GenericAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class CLRCalculation(generics.GenericAPIView):

    serializer_class = CLRCalculationSeriaziler

    def post(self, request):
        serialized_data = CLRCalculationSeriaziler(data=request.data)
        if serialized_data.is_valid(raise_exception=True):
            user_id = serialized_data.validated_data.get('user_id')
            business_id = serialized_data.validated_data.get('business_id')
            donation_amount = serialized_data.validated_data.get('donation_amount')

            donations = Donation.objects.values()
            donations = list(donations)
            print('donations', list(donations))

            current_donation_obj = {
                'round_number': 0,
                'donation_amount': donation_amount,
                'donor_id': user_id,
                'recipient_id': business_id,
                'transaction_id': 'string',
                'match': True,
                'donation_status': 'Success'
            }

            donations.append(current_donation_obj)

            translated_donation_data = translate_data(donations)
            aggregated_contributions = aggregate_contributions(translated_donation_data)
            calculate_clr_data, bigtot, saturation_point = calculate_live_clr(aggregated_contributions, business_id)

            print('translated_donation_data', translated_donation_data)
            print('aggregated_contributions', aggregated_contributions)
            print('calculate_clr_data', (calculate_clr_data))

            # clr_match_details = {}
            # for business in calculate_clr_data:
            #     id = business.get('id')
            #     if id == business_id:
            #         clr_match_details = business
            #         break

            matched_clr_amount = calculate_clr_data['clr_amount']
            print(matched_clr_amount, 'matched_clr_amount')

            business = Business.objects.get(pk=business_id)
            current_clr_amount = business.current_clr_matching_amount

            user_match_amount = matched_clr_amount - float(current_clr_amount)
            print('user_match_amount', user_match_amount)

            return Response(json.dumps({'clr_data': user_match_amount}), status=status.HTTP_201_CREATED)


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