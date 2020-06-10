from rest_framework import serializers

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
                username=validated_data.get('username', ''),
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


