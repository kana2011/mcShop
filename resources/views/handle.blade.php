<html>
<head>
<script type="text/javascript" src="assets/components/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="https://raw.githubusercontent.com/mgalante/jquery.redirect/master/jquery.redirect.js"></script>
</head>
<body>
<form style="display: hidden" action="/" method="POST" id="form">
<input type="hidden" id="var1" name="path" value=""/>
<input type="hidden" id="var2" name="statusCode" value=""/>
<input type="hidden" id="var3" name="reason" value=""/>

<script type="text/javascript">
	$("#var1").val("<?PHP echo $path; ?>");
	$("#var2").val("<?PHP echo $statusCode; ?>");
	$("#var3").val("<?PHP echo $reason; ?>");
	$("#form").submit();
</script>
</form>
</body>
</html>