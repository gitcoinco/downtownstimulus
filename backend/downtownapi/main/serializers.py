import logging

from firebase_admin import auth, credentials, initialize_app, _apps

from rest_framework import serializers

from django.contrib.auth import authenticate
from django.core.exceptions import ObjectDoesNotExist

from .models import Business, User, Donation, Round

logger = logging.getLogger(__name__)


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
                email=validated_data.get('email', '')
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


class RoundSerializer(serializers.Serializer):
    class Meta:
        model = Round
        fields = '__all__'


class CLRManySerializer(serializers.Serializer):
    clr_objs = CLRCalculationSeriaziler(many=True)


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
            # users. (Assuming the default ModelBackend authentication
            # backend.)
            if not user:
                msg = 'Unable to log in with provided credentials.'
                logger.info('Cant Authenticate User')
                raise serializers.ValidationError(msg, code='authorization')

            attrs['user'] = user
            return attrs

        elif username and oauth_uuid:
            try:
                user = User.objects.get(username=username)
                if not _apps:
                    cred = credentials.Certificate(
                        '/backend/downtownapi/downtown-stimulus-firebase-adminsdk-litas-a4b3da02de.json')
                    default_app = initialize_app(cred, {
                        'apiKey': "AIzaSyDQaEt__JE2N8VpOHyDms4gdBcCrbpMe3g",
                        'authDomain': "downtown-stimulus.firebaseapp.com",
                        'databaseURL': "https://downtown-stimulus.firebaseio.com",
                        'projectId': "downtown-stimulus",
                        'storageBucket': "downtown-stimulus.appspot.com",
                        'messagingSenderId': "441301072810",
                        'appId': "1:441301072810:web:bf6c5f83f7bd7f9b6ec9d3",
                        'measurementId': "G-9GZG7Y792M"
                    })

                user_data = auth.verify_id_token(oauth_uuid)
                print(user_data['email'], 'user_data')
                user_email = user_data['email']

                if user_email == user.email:
                    print('User is same')
                    attrs['user'] = user
                    return attrs
                else:
                    logger.info('Cant Authenticate User')
                    msg = 'Cant Login User! Invalid Credentials'
                    raise serializers.ValidationError(
                        msg, code='authorization')

            except ObjectDoesNotExist as e:
                logger.info('No Such User')
                msg = 'Cant Login User! No Such User Found'
                raise serializers.ValidationError(msg, code='authorization')

            except Exception as e:
                logger.info('Firebase Cant Authenticate User, ' + str(e))
                msg = 'Cant Login User! Invalid Credentials'
                raise serializers.ValidationError(msg, code='authorization')

        else:
            logger.info('API Bad Request. All params not included')
            msg = 'Must include "username" and "password" or "oauth_uuid"'
            raise serializers.ValidationError(msg, code='authorization')
