{
    "mappings": {
      "dynamic": false,
      "fields": {
        "title": [
          {
            "type": "string"
          },
          {
            "foldDiacritics": false,
            "maxGrams": 7,
            "minGrams": 3,
            "tokenization": "edgeGram",
            "type": "autocomplete"
          }
        ]
      }
    }
  }