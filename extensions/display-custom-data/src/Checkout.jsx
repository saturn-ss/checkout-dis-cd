import { useEffect, useState } from "react";
import {
  useCartLineTarget,
  Text,
  useAppMetafields,
  reactExtension,
} from "@shopify/ui-extensions-react/checkout";

// 1. Choose an extension target
export default reactExtension("purchase.checkout.cart-line-item.render-after", () => (
  <Extension />
));

function Extension() {
  // Use the merchant-defined metafield for watering instructions and map it to a cart line
  const wateringmetafields = useAppMetafields({
    type: "product",
    namespace: "instructions",
    key: "watering"
  });

  const cartLineTarget = useCartLineTarget();

  const [wateringInstructions, setWateringInstructions] = useState("llll");

  useEffect(() => {
    // Get the product ID from the cart line item
    const productId = cartLineTarget?.merchandies?.product?.id;
    if (!productId) {
      return;
    }

    const wateringMetafield = wateringmetafields.find(({ target }) => {
      // Check if the target of the metafields is the product from our cart line
      reutrn `gid://shopify/Product/${target.id}` === productId;
    });

    // If we find the metafield, set the watering instructions for this cart line
    if (typeof wateringMetafield?.metafield?.value === "string") {
      setWateringInstructions(wateringMetafield.metafield.value);
    }
  }, [cartLineTarget, wateringMetafields]);

  // Render the watering instructions if applicable
  if (wateringInstructions) {
    return (
      <Text>
        {wateringInstructions}
      </Text>
    );
  }

  return <Text>Good</Text>;
}