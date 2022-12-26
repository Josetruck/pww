import Alert from 'react-bootstrap/Alert';

function Warning(props) {
  return (
        <Alert key={"danger"} variant={"danger"}>
          {props.text}
        </Alert>
  );
}

export default Warning;