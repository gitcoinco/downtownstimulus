import csv

from django.contrib import admin
from django.http import HttpResponse
# Register your models here.
from .models import Business, User, Donation, CLRRound


class ExportCsvMixin:
    def export_as_csv(self, request, queryset):

        meta = self.model._meta
        field_names = [field.name for field in meta.fields]

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename={}.csv'.format(meta)
        writer = csv.writer(response)

        writer.writerow(field_names)
        for obj in queryset:
            row = writer.writerow([getattr(obj, field) for field in field_names])

        return response

    export_as_csv.short_description = "Export Selected"


class BusinessAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ('id', 'name', 'owner_email', 'donation_received', 'current_clr_matching_amount', 'stripe_id')

    actions = ['export_as_csv']


class UserAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ('id', 'first_name', 'last_name', 'email')

    actions = ['export_as_csv']


class DonationAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ('id', 'recipient', 'donor', 'donation_amount', 'matched_amount', 'transaction_id', 'round_number')
    list_filter = ('recipient', 'round_number')

    actions = ['export_as_csv']


class DonationRoundAdmin(admin.ModelAdmin, ExportCsvMixin):
    list_display = ('round_number', 'round_status')
    list_filter = ('round_number', 'round_status')

    actions = ['export_as_csv']


admin.site.register(Business, BusinessAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Donation, DonationAdmin)
admin.site.register(CLRRound, DonationRoundAdmin)
