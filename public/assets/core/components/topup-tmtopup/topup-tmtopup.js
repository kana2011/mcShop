var app;
var tmtopup;
var iframe;
Polymer({
    is: "topup-tmtopup",
    ready: function() {
        tmtopup = this;
        this.showtopup = true;

        this.username = app.user.username;

        iframe = document.createElement("IFRAME");
        iframe.style.display = "hidden";
        iframe.setAttribute("src", "/assets/core/components/topup-tmtopup/tmt-custom3rd.html");
        document.body.appendChild(iframe);
    },
    submitTopup: function() {
        submit_tmnc();
    }
});

function getPid() {
	return iframe.contentWindow.getPid();
}
