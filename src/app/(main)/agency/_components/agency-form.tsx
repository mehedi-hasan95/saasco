"use client";
import { Agency } from "../../../../../generated/prisma";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { FileUpload } from "@/components/common/file-upload";
import { agencyFormSchema } from "@/schema/forms-schema";
import { useState } from "react";
import { createAgency, deleteAgency, updateAgency } from "@/action/agency";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  data?: Partial<Agency>;
}

export const AgencyForm = ({ data }: Props) => {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof agencyFormSchema>>({
    resolver: zodResolver(agencyFormSchema),
    defaultValues: {
      name: data?.name || "",
      companyEmail: data?.companyEmail,
      agencyLogo: data?.agencyLogo || undefined,
      companyPhone: data?.companyPhone || "",
      whiteLabel: data?.whiteLabel || false,
      goal: data?.goal || 5,
      address: data?.address || "",
      city: data?.city || "",
      country: data?.country || "",
      state: data?.state || "",
      zipCode: data?.zipCode || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof agencyFormSchema>) {
    if (data?.id && data.customerId) {
      await updateAgency(data.id, values);
      router.push(`/agency/${data.id}`);
    } else {
      const bodyData = {
        email: values.companyEmail,
        name: values.name,
        shipping: {
          address: {
            city: values.city,
            country: values.country,
            line1: values.address,
            postal_code: values.zipCode,
            state: values.zipCode,
          },
          name: values.name,
        },
        address: {
          city: values.city,
          country: values.country,
          line1: values.address,
          postal_code: values.zipCode,
          state: values.zipCode,
        },
      };

      const customerResponse = await fetch("/api/stripe/create-customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });
      const customerData: { customerId: string } =
        await customerResponse.json();
      const response = await createAgency(
        { role: "AGENCY_OWNER" },
        values,
        customerData.customerId
      );
      router.push(`/agency/${response}`);
    }
  }

  const isLoading = form.formState.isSubmitting;

  // delete agency
  const [isDeleteAgency, setIsDeleteAgency] = useState<boolean>(false);
  const handleDeleteAgency = async () => {
    if (!data?.id) return;
    try {
      setIsDeleteAgency(true);
      await deleteAgency(data.id);
      toast.success("Agency delete successfully");
    } catch (error) {
      console.error(error);
      toast.error("Can't delete agency");
    } finally {
      setIsDeleteAgency(false);
    }
  };
  return (
    <AlertDialog>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Agency Information</CardTitle>
          <CardDescription>
            Let&apos;s create an agency for your Business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="agencyLogo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agency Name</FormLabel>
                    <FormControl>
                      <FileUpload
                        endPoint="imageUploader"
                        onChange={field.onChange}
                        value={field.value}
                        uploadLabel="Drag and drop your agency image"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid lg:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agency Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="saasco"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agency Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="saasco"
                          readOnly
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agency Phone</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="+880123456789"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="goal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agency Goal</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="6"
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? undefined
                                : Number(e.target.value)
                            )
                          }
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="whiteLabel"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border gap-4 p-4">
                    <div>
                      <FormLabel>Whitelabel Agency</FormLabel>
                      <FormDescription>
                        Turning on whilelabel mode will show your agency logo to
                        all sub accounts by default. You can overwrite this
                        functionality through sub account settings.
                      </FormDescription>
                    </div>

                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agency Address</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="123 street"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agency City</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="Jessore"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agency State</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="Jessore"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agency Zip Code</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="7400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agency Country</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="Bangladesh"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {isLoading ? (
                <Button disabled>
                  Please Wait <Loader2 className="animate-spin" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-theme hover:bg-theme/90 text-white"
                >
                  Create Agency
                </Button>
              )}
            </form>
          </Form>
          {data?.id && (
            <>
              <div className="flex flex-row items-center justify-between rounded-lg border border-destructive gap-4 p-4 mt-4">
                <div className="text-theme">
                  <div>Danger Zone</div>
                </div>
                <div className="text-muted-foreground">
                  Deleting your agency cannpt be undone. This will also delete
                  all sub accounts and all data related to your sub accounts.
                  Sub accounts will no longer have access to funnels, contacts
                  etc.
                </div>
                <AlertDialogTrigger
                  disabled={isLoading}
                  className="text-red-600 p-2 text-center mt-2 rounded-md hove:bg-red-600 hover:text-white whitespace-nowrap cursor-pointer"
                >
                  Delete Agency
                </AlertDialogTrigger>
              </div>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-left">
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-left">
                    This action cannot be undone. This will permanently delete
                    the Agency account and all related sub accounts.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex items-center">
                  <AlertDialogCancel className="cursor-pointer">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive hover:bg-destructive/90 text-white cursor-pointer"
                    onClick={handleDeleteAgency}
                    disabled={isDeleteAgency}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </>
          )}
        </CardContent>
      </Card>
    </AlertDialog>
  );
};
