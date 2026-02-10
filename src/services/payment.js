import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

export const handleEsewaPayment = async (totalPrice, bookingId) => {
  try {
    const total_amount = totalPrice;
    const transaction_uuid = uuidv4();
    const productCode = "EPAYTEST";
    const secretKey = "8gBm/:&EnhH.1/q";

    // generate signature
    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${productCode}`;
    const hash = CryptoJS.HmacSHA256(hashString, CryptoJS.enc.Utf8.parse(secretKey));
    const signature = CryptoJS.enc.Base64.stringify(hash);

    const currentUrl = window.location.href; // save current page for redirect

    const params = {
      amount: total_amount,
      total_amount,
      transaction_uuid,
      product_code: productCode,
      signature,
      failure_url: `http://localhost:8080/api/traveller/tour/payments/esewa/failure?returnUrl=${encodeURIComponent(currentUrl)}`,
      tax_amount: 0,
      product_service_charge: 0,
      product_delivery_charge: 0,
      signed_field_names: "total_amount,transaction_uuid,product_code",
    };

    const encodedData = encodeURIComponent(
      btoa(
        JSON.stringify({
          bookingId,
          total_amount,
          transaction_uuid,
        })
      )
    );

    params.success_url = `http://localhost:8080/api/traveller/tour/payments/esewa/success?returnUrl=${encodeURIComponent(
      currentUrl
    )}&meta=${encodedData}`;

    // create form dynamically
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    form.target = "_blank"; // open in new tab

    Object.entries(params).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    form.remove(); // cleanup
  } catch (error) {
    console.error("Error initiating eSewa payment", error);
    alert("Failed to initiate payment. Please try again.");
  }
};
