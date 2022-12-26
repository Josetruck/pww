import Alert from 'react-bootstrap/Alert';

function AlertOk(props) {
  return (
        <Alert key={"success"} variant={"success"}>
          {props.text}
        </Alert>
  );
}

export default AlertOk;