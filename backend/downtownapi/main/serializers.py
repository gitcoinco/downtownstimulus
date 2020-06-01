from rest_framework import serializers

from .models import Business, User, Donation


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['email'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            profile_pic=validated_data['profile_pic'],
            phone_number=validated_data['phone_number'],
            oauth_uuid=validated_data['oauth_uuid'],
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
