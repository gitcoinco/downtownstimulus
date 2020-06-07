from django.urls import path, include
from .views import RootView, UserList, UserListDetail, BusinessList, BusinessListDetail, DonationList, DonationListDetail, CLRCalculation

urlpatterns = [
    path('', RootView.as_view(), name='root-view'),

    #Users APIs
    path('users/', UserList.as_view(), name='user-list'),
    path('users/<int:pk>/', UserListDetail.as_view(), name='user-detail'),

    #Business APIs
    path('business/', BusinessList.as_view(), name='business-list'),
    path('business/<int:pk>/', BusinessListDetail.as_view(), name='business-detail'),

    #Donation APIs
    path('donations/', DonationList.as_view(), name='donation-list'),
    path('donations/<int:pk>/', DonationListDetail.as_view(), name='donation-detail'),

    #CLR Amount Calculation APIs
    path('clramountaggregation', CLRCalculation.as_view(), name='clr-calculation')
]