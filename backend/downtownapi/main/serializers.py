from rest_framework import serializers

from django.contrib.auth import authenticate

from .models import Business, User, Donation


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
                raise serializers.ValidationError(msg, code='authorization')

            attrs['user'] = user
            return attrs
        elif username and oauth_uuid:
            user = User.objects.get(oauth_uuid=oauth_uuid)

            attrs['user'] = user
            return attrs
        else:
            msg = 'Must include "username" and "password" or "oauth_uuid"'
            raise serializers.ValidationError(msg, code='authorization')
