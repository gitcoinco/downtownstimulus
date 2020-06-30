from django.urls import path, include, re_path
from .views import RootView, UserList, UserListDetail, BusinessList, BusinessListDetail, DonationList, DonationListDetail, CLRCalculation, activate, CustomAuthToken, add_business_csv, CLRRoundView, StripeDonations, StripeSecretKeyView

urlpatterns = [
    path('', RootView.as_view(), name='root-view'),

    # Users APIs
    path('users/', UserList.as_view(), name='user-list'),
    path('users/<int:pk>/', UserListDetail.as_view(), name='user-detail'),

    # Business APIs
    path('business/', BusinessList.as_view(), name='business-list'),
    path('business/<int:pk>/', BusinessListDetail.as_view(), name='business-detail'),

    # Donation APIs
    path('donations/', DonationList.as_view(), name='donation-list'),
    path('donations/<int:pk>/', DonationListDetail.as_view(), name='donation-detail'),

    # Stripe Donation POST API
    path('stripe_donations/', StripeDonations.as_view(), name='stripe-donation'),

    # CLR Amount Calculation APIs
    path('clramountaggregation/', CLRCalculation.as_view(), name='clr-calculation'),

    re_path(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
            activate, name='activate'),

    re_path(r'^api-token-auth/', CustomAuthToken.as_view()),

    # path('add_business_csv/', add_business_csv, name='add-business-csv'),

    path('current_round/', CLRRoundView.as_view(), name='current-clr-round'),

    path('stripe_secret/', StripeSecretKeyView.as_view(), name='stripe-secret')
]
