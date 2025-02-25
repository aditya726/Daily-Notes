import Form from "../components/Form";


function Login(){

 
  return(
      <>
          <div>
            <Form route = '/api/token/' method = 'login'></Form>
          </div>
          
      </>
  );
}

export default Login;