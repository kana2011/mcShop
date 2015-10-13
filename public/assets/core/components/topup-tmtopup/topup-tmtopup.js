var app;
var tmtopup;
var iframe;
Polymer({
    is: "topup-tmtopup",
    ready: function() {
        tmtopup = this;
        this.showtopup = true;

        this.userid = app.user.id;

        iframe = document.createElement("IFRAME");
        iframe.style.display = "hidden";
        iframe.setAttribute("src", "/assets/core/components/topup-tmtopup/tmt-custom3rd.html");
        document.body.appendChild(iframe);

        console.log("tmtopup ready!");
    },
    submitTopup: function() {
        submit_tmnc();
    },
    submitPayment: function() {
        submit_payment();
    }
});

function getPid() {
	return iframe.contentWindow.getPid();
}
