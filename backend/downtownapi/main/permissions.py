from rest_framework import permissions


class UserPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'GET':
            return request.user.is_authenticated and request.user.is_staff
        elif request.method == 'POST':
            return True
        elif request.method in ['PUT', 'DELETE', 'PATCH']:
            return request.user.is_authenticated and request.user.is_staff
        else:
            return True


class BusinessPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        elif request.method == 'POST':
            return request.user.is_authenticated and request.user.is_staff
        elif request.method in ['PUT', 'DELETE', 'PATCH']:
            return request.user.is_authenticated and request.user.is_staff
        else:
            return True


class DonationPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'GET':
            return request.user.is_authenticated and request.user.is_staff
        elif request.method == 'POST':
            return request.user.is_authenticated
        else:
            return False