/* Kontaktformular → öffnet das Standard-E-Mail-Programm mit vorausgefüllter
   Nachricht (mailto:). Keine Server-Verarbeitung, keine externen Dienste. */
(function () {
  "use strict";

  var RECIPIENT = "elektro@klaffel.at";

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("kontakt-form");
    if (!form) {
      return;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Native HTML-Validierung (required, type=email) auslösen
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var telefon = (data.get("telefon") || "").toString().trim();
      var nachricht = (data.get("nachricht") || "").toString().trim();

      var subject = "Anfrage über die Website" + (name ? " – " + name : "");

      var lines = [nachricht, "", "—", "Name: " + name, "E-Mail: " + email];
      if (telefon) {
        lines.push("Telefon: " + telefon);
      }
      var body = lines.join("\r\n");

      var href =
        "mailto:" +
        RECIPIENT +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);

      // Öffnet das Standard-E-Mail-Programm
      window.location.href = href;
    });
  });
})();
