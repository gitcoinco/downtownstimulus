import json

from django.shortcuts import render
from rest_framework import mixins
from rest_framework import generics
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import status

from .models import User, Business, Donation
from .serializers import UserSerializer, BusinessSerializer, DonationSerializer, CLRCalculationSeriaziler


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
        serialized_data = CLRCalculationSeriaziler(request.data)
        if serialized_data.is_valid(raise_exception=True):
            user_id = serialized_data.validated_data.get('user_id')
            business_id = serialized_data.validated_data.get('business_id')
            donation_amount = serialized_data.validated_data.get('donation_amount')
            donations = Donation.objects.filter(donor__id=user_id, recipient__id=business_id).values()
            print(donations)
            return Response(json.dumps(donations))
