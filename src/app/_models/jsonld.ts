export class JSonLD {
  json: string;
  id: string;
  constructor(view: JSonLD = null) {
    if (view != null) {
      this.json = view.json;
      this.id = view.id;
    } else {
      this.json = '{\n'
        + '    "@context": "https://schema.org/",\n'
        + '    "@type": "Product",\n'
        + '    "name": "Executive Anvil",\n'
        + '    "image": [\n'
        + '        "https://example.com/photos/1x1/photo.jpg",\n'
        + '        "https://example.com/photos/4x3/photo.jpg",\n'
        + '        "https://example.com/photos/16x9/photo.jpg"\n'
        + '    ],\n'
        + '    "description": "Sleeker than ACME\'s Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.",\n'
        + '    "sku": "0446310786",\n'
        + '    "mpn": "925872",\n'
        + '    "brand": {\n'
        + '        "@type": "Brand",\n'
        + '        "name": "ACME"\n'
        + '    },\n'
        + '    "review": {\n'
        + '        "@type": "Review",\n'
        + '        "reviewRating": {\n'
        + '            "@type": "Rating",\n'
        + '            "ratingValue": "4",\n'
        + '            "bestRating": "5"\n'
        + '        },\n'
        + '        "author": {\n'
        + '            "@type": "Person",\n'
        + '            "name": "Fred Benson"\n'
        + '        }\n'
        + '    },\n'
        + '    "aggregateRating": {\n'
        + '        "@type": "AggregateRating",\n'
        + '        "ratingValue": "4.4",\n'
        + '        "reviewCount": "89"\n'
        + '    },\n'
        + '    "offers": {\n'
        + '        "@type": "Offer",\n'
        + '        "url": "https://example.com/anvil",\n'
        + '        "priceCurrency": "USD",\n'
        + '        "price": "119.99",\n'
        + '        "priceValidUntil": "2020-11-20",\n'
        + '        "itemCondition": "https://schema.org/UsedCondition",\n'
        + '        "availability": "https://schema.org/InStock"\n'
        + '    }\n'
        + '}';
      this.id = '';
    }
  }
}
