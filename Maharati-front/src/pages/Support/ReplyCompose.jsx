import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Form, Card, CardBody, Col, Row, Container } from "reactstrap";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useSnackbar } from "notistack";

const ReplyCompose = ({
  contact,
  putContact,
  setReply,
  setContact,
  composeEmail,
  setCompose,
}) => {
  document.title = "Reply Compose";
  const { enqueueSnackbar } = useSnackbar();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [email, setEmail] = useState(contact?.Email || "");
  const [subject, setSubject] = useState(contact?.Subject || "");
  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const htmlContent = draftToHtml(rawContentState);

    if (contact.Email) {
      putContact({ Reply: htmlContent });
    }
    setContact((prev) => ({
      ...prev,
      Reply: htmlContent,
    }));

    composeEmail(email, "Re: " + subject, htmlContent);
    setReply(false);
    setCompose(false);
    enqueueSnackbar("Reply sent");
  };

  return (
    <React.Fragment>
      <div>
        <Container fluid={true}>
          <Row className="mb-4">
            <Col xl={9}>
              <Card className="mb-0">
                <CardBody>
                  <div
                    className="mb-3"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      gap: "0.5rem 1rem",
                    }}
                  >
                    <label
                      htmlFor="To"
                      style={{
                        gridColumn: "1",
                        alignSelf: "center",
                        marginTop: "0.4rem",
                      }}
                    >
                      To
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="To"
                      value={contact?.Email}
                      onChange={(e) => setEmail(e.target.value)}
                      readOnly={!!contact.Email}
                      style={{ gridColumn: "2", alignSelf: "center" }}
                    />

                    <label
                      htmlFor="Subject"
                      style={{
                        gridColumn: "1",
                        alignSelf: "center",
                        marginTop: "0.4rem",
                      }}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Subject"
                      value={contact?.Subject}
                      readOnly={!!contact.Subject}
                      onChange={(e) => setSubject(e.target.value)}
                      style={{ gridColumn: "2", alignSelf: "center" }}
                    />
                  </div>

                  <div
                    id="email-editor"
                    style={{
                      minHeight: "360px",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <Form
                      method="post"
                      onSubmit={handleSubmit}
                      style={{
                        flex: "1",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Editor
                        className="mb-3 ql-size-large"
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        placeholder="Start From Here..."
                        editorState={editorState}
                        onEditorStateChange={handleEditorChange}
                      />
                      <div
                        className="btn-toolbar"
                        style={{ marginTop: "auto" }}
                      >
                        <button
                          type="button"
                          className="btn btn-primary waves-effect waves-light me-1"
                          onClick={() => {
                            setReply(false);
                            setCompose(false);
                          }}
                        >
                          <i className="far fa-trash-alt"></i>
                        </button>
                        <button
                          type="submit"
                          className="btn btn-success waves-effect waves-light"
                        >
                          <span>Send</span>
                          <i className="fab fa-telegram-plane ms-2"></i>
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ReplyCompose;
