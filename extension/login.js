function Login() {
  var i, args=Login.arguments; document.returnValue = false;
  eval(args[i]+".location.href='"+args[i+1]+"'");
} 