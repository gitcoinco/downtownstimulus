import os
import logging

from firebase_admin import auth, credentials, initialize_app, _apps

from rest_framework import serializers

from django.contrib.auth import authenticate
from django.core.exceptions import ObjectDoesNotExist

from .models import Business, User, Donation, CLRRound

logger = logging.getLogger(__name__)

FIREBASE_KEY = os.environ.get('FIREBASE_KEY')
FIREBASE_AUTH_DOMAIN = os.environ.get('FIREBASE_AUTH_DOMAIN')
FIREBASE_DATABASE_URL = os.environ.get('FIREBASE_DATABASE_URL')
FIREBASE_PROJECT_ID = os.environ.get('FIREBASE_PROJECT_ID')
FIREBASE_STORAGE_BUCKET = os.environ.get('FIREBASE_STORAGE_BUCKET')
FIREBASE_MESSAGING_SENDER_ID = os.environ.get('FIREBASE_MESSAGING_SENDER_ID')
FIREBASE_APPID = os.environ.get('FIREBASE_APPID')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'required': False}}

    def create(self, validated_data):
        is_oauth_uuid = validated_data.get('oauth_uuid', False)
        if is_oauth_uuid:
            user = User.objects.create_user(
                first_name=validated_data.get('first_name', ''),
                last_name=validated_data.get('last_name', ''),
                username=validated_data.get('email'),
                email=validated_data.get('email'),
                profile_pic=validated_data.get('profile_pic', None),
                phone_number=validated_data.get('phone_number', None),
                oauth_uuid=validated_data.get('oauth_uuid'),
                is_email_verified=True
            )
            user.save()
        else:
            user = User.objects.create_user(
                first_name=validated_data.get('first_name', ''),
                last_name=validated_data.get('last_name', ''),
                username=validated_data.get('email', ''),
                email=validated_data.get('email', ''),
                is_email_verified=False,
                is_active=False,
            )
            user.set_password(validated_data['password'])
            user.save()

        return user


class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = '__all__'


class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = '__all__'


class CLRCalculationSeriaziler(serializers.Serializer):
    user_id = serializers.IntegerField()
    business_id = serializers.IntegerField()
    donation_amount = serializers.FloatField()


class RoundSerializer(serializers.ModelSerializer):
    class Meta:
        model = CLRRound
        fields = '__all__'


class CLRManySerializer(serializers.Serializer):
    clr_objs = CLRCalculationSeriaziler(many=True)


class StripeSecretKey(serializers.Serializer):
    amount = serializers.IntegerField()
    name = serializers.CharField(label= "Donor Name")
    shipping_address = serializers.CharField(label='Shipping Address')
    shipping_country = serializers.CharField(label='Shipping Country')
    business_id = serializers.CharField(label='Business Id')


class LoginTokenSerializer(serializers.Serializer):
    username = serializers.CharField(label="Email ID")
    password = serializers.CharField(
        label="Password",
        style={'input_type': 'password'},
        trim_whitespace=False,
        required=False
    )
    oauth_uuid = serializers.CharField(
        label="Oauth ID",
        required=False
    )

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        oauth_uuid = attrs.get('oauth_uuid')

        if username and password:
            user = authenticate(request=self.context.get('request'),
                                username=username, password=password)
            # The authenticate call simply returns None for is_active=False
            # users.
            if not user:
                try:
                    u = User.objects.get(username=username)
                    print(u)
                except:
                    u = None
                if not u.is_email_verified:
                    msg = 'Account not active. Please check your Inbox and Verify your Email'
                    logger.info('Account Not Active')
                    raise serializers.ValidationError(msg, code='authorization')
                msg = 'Unable to log in with provided credentials.'
                logger.info('Cant Authenticate User')
                raise serializers.ValidationError(msg, code='authorization')

            attrs['user'] = user
            return attrs

        elif username and oauth_uuid:
            if not _apps:
                cred = credentials.Certificate(
                    '/backend/downtownapi/downtown-stimulus-firebase-adminsdk-litas-a4b3da02de.json')

                default_app = initialize_app(cred, {
                    'apiKey': FIREBASE_KEY,
                    'authDomain': FIREBASE_AUTH_DOMAIN,
                    'databaseURL': FIREBASE_DATABASE_URL,
                    'projectId': FIREBASE_PROJECT_ID,
                    'storageBucket': FIREBASE_STORAGE_BUCKET,
                    'messagingSenderId': FIREBASE_MESSAGING_SENDER_ID,
                    'appId': FIREBASE_APPID
                })
            try:
                user = User.objects.get(username=username)


                user_data = auth.verify_id_token(oauth_uuid)
                user_email = user_data['email']

                if user_email == user.email:
                    attrs['user'] = user
                    return attrs
                else:
                    logger.info('Cant Authenticate User')
                    msg = 'Cant Login User! Invalid Credentials'
                    raise serializers.ValidationError(
                        msg, code='authorization')

            except ObjectDoesNotExist as e:
                logger.info('Firebase Cant Authenticate User, ' + str(e))

                user_verify_data = auth.verify_id_token(oauth_uuid)
                user_id = user_verify_data['user_id']
                user_data = auth.get_user(user_id)
                user_fullname = user_data.display_name.split(' ')

                user = User.objects.create_user(
                    first_name=user_fullname[0],
                    last_name="".join(user_fullname[1:]),
                    username=user_data.email,
                    email=user_data.email,
                    profile_pic=user_data.photo_url,
                    phone_number=user_data.phone_number,
                    oauth_uuid=user_data.uid,
                    is_email_verified=True
                )
                user.save()

                attrs['user'] = user
                return attrs

            except Exception as e:
                logger.info('Firebase Cant Authenticate User, ' + str(e))
                msg = 'Cant Login User! Invalid Credentials'
                raise serializers.ValidationError(msg, code='authorization')

        else:
            logger.info('API Bad Request. All params not included')
            msg = 'Must include "username" and "password" or "oauth_uuid"'
            raise serializers.ValidationError(msg, code='authorization')
