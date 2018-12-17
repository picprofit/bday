const rules = {
  "rules": {
    ".write": "!data.exists()",
    ".read": true,
    "cards": {
      "$cardId": {
        ".write": "!data.exists() || (data.child('owner').val() === auth.uid)",
        ".read": true
      }
    },
    "owners": {
      "$uid": {
        ".write": "auth.uid != null && (!data.exists() || $uid === auth.uid)",
        ".read": true
      }
    },
  }
};