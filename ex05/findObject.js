// J'utiliserais un outils déjà en production.
// exemple : Amazon Rekognition ou bien Google IA Vision

// Exemple AWS Rekognition :
// le stockage de l'image se fait dans un S3Bucket.

const TO_FIND = ["Clothing", "Apparel"];

const params = {
  Image: {
    S3Object: {
      Bucket: "checkObject",
      Name: "image1.jpg"
    }
  },
  MaxLabels: 123,
  MinConfidence: 70
};

rekognition.detectLabels(params, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  // RESULT => data.labels.filter(elem => TO_FIND.includes(elem.Name)));
});

// RESULT
const data = {
  Labels: [
    {
      Name: "Sleeve",
      Confidence: 99.9950180053711,
      Instances: [],
      Parents: [
        {
          Name: "Clothing"
        }
      ]
    },
    {
      Name: "Clothing",
      Confidence: 99.9950180053711,
      Instances: [],
      Parents: []
    },
    {
      Name: "Apparel",
      Confidence: 99.9950180053711,
      Instances: [],
      Parents: []
    },
    {
      Name: "Human",
      Confidence: 94.66314697265625,
      Instances: [],
      Parents: []
    },
    {
      Name: "Cardigan",
      Confidence: 84.30410766601562,
      Instances: [],
      Parents: [
        {
          Name: "Sweater"
        },
        {
          Name: "Clothing"
        }
      ]
    },
    {
      Name: "Sweatshirt",
      Confidence: 70.06746673583984,
      Instances: [],
      Parents: [
        {
          Name: "Sweater"
        },
        {
          Name: "Clothing"
        }
      ]
    }
  ],
  LabelModelVersion: "2.0"
};
