import React, { useEffect, useState, useCallback, useRef } from "react";
import { debounce } from "lodash";
import PropTypes from "prop-types";
import moment from "moment-timezone";
import { useSnackbar } from "notistack";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";
import { formatDate } from "@fullcalendar/core";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
  addNewEvent as onAddNewEvent,
  deleteEvent as onDeleteEvent,
  getCategories as onGetCategories,
  getEvents as onGetEvents,
  updateEvent as onUpdateEvent,
  resetCalendar,
} from "../../store/actions";

import DeleteModal from "../../components/UI/DeleteModal";

//css
// import "@fullcalendar/bootstrap/main.css";

//redux
import { useSelector, useDispatch } from "react-redux";

import { createSelector } from "reselect";
import useAuth from "../../hooks/useAuth";

const Calender = (props) => {
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const [event, setEvent] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  // events validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: (event && event.title) || "",
      category: (event && event.category) || "",
      description: (event && event.description) || "",

      start: (event && event.start) || "",
      end: (event && event.end) || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Your Event Title"),
      category: Yup.string().required("Please Select Your Event Category"),
      start: Yup.string().required("Please Select a Valid Start Date & Time"),
      end: Yup.string().required("Please Select a Valid End Date & Time"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateEvent = {
          _id: event._id,
          title: values.title,
          className: values.category + " text-white",
          category: values.category,
          description: values.description,
          start: values.start.replace("T", " "),
          end: values.end.replace("T", " "),
          Owner: auth?.user?._id,
        };
        // update event
        dispatch(onUpdateEvent(updateEvent, auth?.accessToken));
        enqueueSnackbar("Event Updated");

        validation.resetForm();
      } else {
        const newEvent = {
          title: values["title"],
          description: values["description"],
          Owner: auth?.user?._id,

          start: selectedDay
            ? selectedDay.date.toISOString().split("T")[0] +
              " " +
              values["start"]
            : values["start"].replace("T", " "),
          end: selectedDay
            ? selectedDay.date.toISOString().split("T")[0] + " " + values["end"]
            : values["end"].replace("T", " "),
          Owner: auth?.user?._id,
          category: values.category,
          className: values.category + " text-white",
        };
        // save new event
        dispatch(onAddNewEvent(newEvent, auth?.accessToken));
        enqueueSnackbar("Event Added");
        validation.resetForm();
      }
      setSelectedDay(null);
      toggle();
    },
  });

  const calendarpage = createSelector(
    (state) => state.calendar,
    (state) => ({
      events: state.events,
      categories: state.categories,
      isEventUpdated: state.isEventUpdated,
    })
  );
  // Inside your component
  const { events, categories, isEventUpdated } = useSelector(calendarpage);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedDay, setSelectedDay] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(onGetCategories());
    dispatch(onGetEvents(auth?.user?._id, auth?.accessToken));
    new Draggable(document.getElementById("external-events"), {
      itemSelector: ".external-event",
    });
  }, [dispatch]);

  useEffect(() => {
    if (isEventUpdated) {
      setIsEdit(false);
      setEvent({});
      setTimeout(() => {
        dispatch(onGetEvents(auth?.user?._id, auth?.accessToken));
        dispatch(resetCalendar("isEventUpdated", false));
      }, 500);
    }
  }, [dispatch, isEventUpdated]);

  /**
   * Handling the modal state
   */
  const toggle = () => {
    if (modal) {
      setModal(false);
      setEvent(null);
      setIsEdit(false);
    } else {
      setModal(true);
    }
  };

  // const toggleCategory = () => {
  //   setModalcategory(!modalcategory);
  // };

  /**
   * Handling date click on calendar
   */
  const handleDateClick = (arg) => {
    setEvent({});
    const date = arg["date"];
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const currectDate = new Date();
    const currentHour = currectDate.getHours();
    const currentMin = currectDate.getMinutes();
    const currentSec = currectDate.getSeconds();
    const modifiedDate = new Date(
      year,
      month,
      day,
      currentHour,
      currentMin,
      currentSec
    );
    const modifiedData = { ...arg, date: modifiedDate };

    setSelectedDay(modifiedData);
    toggle();
  };

  /**
   * Handling click on event on calendar
   */ function formatDateToLocalISO(date) {
    const tzOffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = new Date(date - tzOffset).toISOString().slice(0, 16); // removes seconds and milliseconds
    return localISOTime;
  }
  const handleEventClick = (arg) => {
    const event = arg.event;
    setEvent({
      _id: event?.extendedProps?._id,
      title: event.title,
      category: event?.extendedProps?.category,
      description: event?.extendedProps?.description,
      start: event.start ? formatDateToLocalISO(event?.start) : "",
      end: event.end ? formatDateToLocalISO(event?.end) : "",
      classNames: event.classNames,
    });
    setIsEdit(true);
    toggle();
  };
  const handleClose = () => {
    setSelectedDay(null);
  };
  /**
   * On delete event
   */
  const handleDeleteEvent = () => {
    dispatch(onDeleteEvent(event._id, auth?.accessToken));
    enqueueSnackbar("Event Deleted");

    setDeleteModal(false);
    toggle();
  };

  /**
   * On category drag event
   */
  const onDrag = (event) => {
    event.preventDefault();
  };

  /**
   * On calendar drop event
   */
  const onDrop = useCallback(
    debounce((event) => {
      const date = event["date"];

      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      const currectDate = new Date();
      const currentHour = currectDate.getHours();
      const currentMin = currectDate.getMinutes();

      const modifiedDate = moment()
        .year(year)
        .month(month)
        .date(day)
        .hour(currentHour)
        .minute(currentMin)
        .utcOffset("+01:00")
        .format("YYYY-MM-DD HH:mm");
      const draggedEl = event.draggedEl;
      const draggedElclass = draggedEl.className;
      if (
        draggedEl.classList.contains("external-event") &&
        draggedElclass.indexOf("fc-event-draggable") === -1
      ) {
        const modifiedData = {
          id: Math.floor(Math.random() * 100),
          title: draggedEl.innerText,
          category: draggedEl.className.split(" ")[0],
          start: modifiedDate,
          className: draggedEl.className,
          Owner: auth?.user?._id,
        };

        dispatch(onAddNewEvent(modifiedData, auth?.accessToken));
        enqueueSnackbar("Event Added");
      }
    }, 300), // 300ms debounce delay
    [events]
  );

  //Jump to Date
  const calendarRef = useRef(null);
  const handleDateChange = (e) => {
    const calendarApi = calendarRef.current.getApi();
    const selectedDate = e.target.value;
    calendarApi.gotoDate(selectedDate);
  };

  const renderEventContent = (eventInfo) => {
    const startTime = formatDate(eventInfo.event.start, {
      // day: "2-digit",
      // month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const endTime = formatDate(eventInfo.event.end, {
      // day: "2-digit",
      // month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "10px",
          padding: "5px",
          gridAutoRows: "min-content",
          "@media (maxWidth: 600px)": {
            gridTemplateColumns: "1fr",
          },
          textAlign: "left",
        }}
      >
        <div>
          <strong>Event:</strong>
        </div>
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal",
          }}
        >
          {eventInfo.event.title.toUpperCase()}
        </div>

        <div>
          <strong>Start:</strong>
        </div>
        <div>{startTime || "N/D"}</div>

        <div>
          <strong>End:</strong>
        </div>
        <div>{endTime || "N/D"}</div>
      </div>
    );
  };
  document.title = "Calendar | Maharati";
  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEvent}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Upzet" breadcrumbItem="Calendar" />
          <Row className="mb-4">
            <Col xl={3}>
              <Card className="h-100">
                <CardBody>
                  <Button
                    color="primary"
                    className="btn font-16 btn-primary waves-effect waves-light w-100"
                    onClick={toggle}
                  >
                    Create New Event
                  </Button>

                  <div id="external-events">
                    <br />

                    <p className="text-muted">
                      Drag and drop your event or click in the calendar
                    </p>
                    {categories &&
                      categories.map((category, i) => (
                        <div
                          className={`${category.type} external-event fc-event text-white`}
                          key={"cat-" + category.id}
                          draggable
                          onDrag={(event) => onDrag(event, category)}
                        >
                          <i className="mdi mdi-checkbox-blank-circle font-size-11 me-2" />
                          {category.title}
                        </div>
                      ))}
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl={9}>
              <Card className="mb-0">
                <CardBody>
                  {/* fullcalendar control */}
                  <Col className="col-12 mb-3">
                    <Label className="form-label">Jump to</Label>
                    <Input
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      onChange={(e) => handleDateChange(e)}
                      style={{ marginBottom: "2rem", width: "fit-content" }}
                    />
                  </Col>
                  <FullCalendar
                    ref={calendarRef}
                    plugins={[BootstrapTheme, dayGridPlugin, interactionPlugin]}
                    slotDuration={"00:15:00"}
                    handleWindowResize={true}
                    themeSystem="bootstrap"
                    headerToolbar={{
                      left: "prev,next today",
                      center: "title",
                      right: "dayGridMonth,dayGridWeek,dayGridDay",
                    }}
                    events={events}
                    editable={true}
                    droppable={true}
                    selectable={true}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    drop={onDrop}
                    eventContent={renderEventContent} // Add this line to customize event rendering
                  />

                  {/* New/Edit event modal */}
                  <Modal
                    isOpen={modal}
                    className={props.className}
                    onClosed={handleClose}
                  >
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit Event" : "Add Event"}
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        <Row>
                          <Col className="col-12 mb-3">
                            <Label className="form-label">Event Title</Label>
                            <Input
                              name="title"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.title || ""}
                              invalid={
                                validation.touched.title &&
                                validation.errors.title
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.title &&
                            validation.errors.title ? (
                              <FormFeedback type="invalid">
                                {validation.errors.title}
                              </FormFeedback>
                            ) : null}
                          </Col>
                          <Col className="col-12 mb-3">
                            <Label className="form-label">
                              Add Description
                            </Label>
                            <Input
                              type="textarea"
                              name="description"
                              rows={6}
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.description || ""}
                              invalid={
                                validation.touched.description &&
                                validation.errors.description
                                  ? true
                                  : false
                              }
                            />

                            {validation.touched.description &&
                            validation.errors.description ? (
                              <FormFeedback type="invalid">
                                {validation.errors.description}
                              </FormFeedback>
                            ) : null}
                          </Col>
                          <Col className="col-12 mb-3">
                            <Label className="form-label">
                              Select Category
                            </Label>
                            <Input
                              type="select"
                              name="category"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.category || ""}
                              invalid={
                                validation.touched.category &&
                                validation.errors.category
                                  ? true
                                  : false
                              }
                            >
                              <option value=""> --Select-- </option>
                              {categories &&
                                categories.map((category, i) => (
                                  <option key={i} value={category.type}>
                                    {category.title}
                                  </option>
                                ))}
                            </Input>
                            {validation.touched.category &&
                            validation.errors.category ? (
                              <FormFeedback type="invalid">
                                {validation.errors.category}
                              </FormFeedback>
                            ) : null}
                          </Col>

                          {!selectedDay && (
                            <Col className="col-12 mb-3">
                              <Label className="form-label">
                                Select Event Start Date & Time
                              </Label>
                              <Input
                                type="datetime-local"
                                name="start"
                                inter
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.start || ""}
                                invalid={
                                  validation.touched.start &&
                                  validation.errors.start
                                    ? true
                                    : false
                                }
                                className={`form-control ${
                                  validation.touched.start &&
                                  validation.errors.start
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              {validation.touched.start &&
                              validation.errors.start ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.start}
                                </FormFeedback>
                              ) : null}
                            </Col>
                          )}

                          {!selectedDay && (
                            <Col className="col-12 mb-3">
                              <Label className="form-label">
                                Select Event End Date & Time
                              </Label>
                              <Input
                                type="datetime-local"
                                name="end"
                                inter
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.end || ""}
                                invalid={
                                  validation.touched.end &&
                                  validation.errors.end
                                    ? true
                                    : false
                                }
                                className={`form-control ${
                                  validation.touched.end &&
                                  validation.errors.end
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              {validation.touched.end &&
                              validation.errors.end ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.end}
                                </FormFeedback>
                              ) : null}
                            </Col>
                          )}

                          {selectedDay && (
                            <Col className="col-12 mb-3">
                              <Label className="form-label">
                                Select Event Start Time
                              </Label>
                              <Input
                                type="time"
                                name="start"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.start || ""}
                                invalid={
                                  validation.touched.start &&
                                  validation.errors.start
                                    ? true
                                    : false
                                }
                                className={`form-control ${
                                  validation.touched.start &&
                                  validation.errors.start
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              {validation.touched.start &&
                              validation.errors.start ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.start}
                                </FormFeedback>
                              ) : null}
                            </Col>
                          )}
                          {selectedDay && (
                            <Col className="col-12 mb-3">
                              <Label className="form-label">
                                Select Event End Time
                              </Label>
                              <Input
                                type="time"
                                name="end"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.end || ""}
                                invalid={
                                  validation.touched.end &&
                                  validation.errors.end
                                    ? true
                                    : false
                                }
                                className={`form-control ${
                                  validation.touched.end &&
                                  validation.errors.end
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              {validation.touched.end &&
                              validation.errors.end ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.end}
                                </FormFeedback>
                              ) : null}
                            </Col>
                          )}
                        </Row>

                        <Row>
                          <Col>
                            <div className="text-end">
                              <button
                                type="button"
                                className="btn btn-light me-2"
                                onClick={() => {
                                  toggle();
                                  setSelectedDay(null);
                                }}
                              >
                                Close
                              </button>
                              {!!isEdit && (
                                <button
                                  type="button"
                                  className="btn btn-danger me-2"
                                  onClick={() => {
                                    setDeleteModal(true);
                                  }}
                                >
                                  Delete
                                </button>
                              )}
                              <button
                                type="submit"
                                className="btn btn-success save-event"
                              >
                                Save
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>

                  {/* <Modal
                    isOpen={modalcategory}
                    toggle={toggleCategory}
                    className={props.className}
                  >
                    <ModalHeader toggle={toggleCategory} tag="h4">
                      Add a category
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          categoryValidation.handleSubmit();
                          return false;
                        }}
                      >
                        <Row form>
                          <Col className="col-12 mb-3">
                            <Label className="form-label">Event Name</Label>
                            <Input
                              name="title"
                              type="text"
                              // value={event ? event.title : ""}
                              onChange={categoryValidation.handleChange}
                              onBlur={categoryValidation.handleBlur}
                              value={categoryValidation.values.title || ""}
                              invalid={
                                categoryValidation.touched.title &&
                                categoryValidation.errors.title
                                  ? true
                                  : false
                              }
                            />
                            {categoryValidation.touched.title &&
                            categoryValidation.errors.title ? (
                              <FormFeedback type="invalid">
                                {categoryValidation.errors.title}
                              </FormFeedback>
                            ) : null}
                          </Col>
                          <Col className="col-12 mb-3">
                            <Label className="form-label">
                              Select Category
                            </Label>
                            <Input
                              type="select"
                              name="category"
                              // value={event ? event.category : "bg-primary"}
                              onChange={categoryValidation.handleChange}
                              onBlur={categoryValidation.handleBlur}
                              value={categoryValidation.values.category || ""}
                              invalid={
                                categoryValidation.touched.category &&
                                categoryValidation.errors.category
                                  ? true
                                  : false
                              }
                            >
                              <option defaultValue> --Select-- </option>
                              <option value="bg-danger">Danger</option>
                              <option value="bg-success">Success</option>
                              <option value="bg-primary">Primary</option>
                              <option value="bg-info">Info</option>
                              <option value="bg-dark">Dark</option>
                              <option value="bg-warning">Warning</option>
                            </Input>
                            {categoryValidation.touched.category &&
                            categoryValidation.errors.category ? (
                              <FormFeedback type="invalid">
                                {categoryValidation.errors.category}
                              </FormFeedback>
                            ) : null}
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="text-end">
                              <button
                                type="button"
                                className="btn btn-light me-2"
                                onClick={toggleCategory}
                              >
                                Close
                              </button>
                              <button
                                type="submit"
                                className="btn btn-success save-event"
                              >
                                Save
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Calender.propTypes = {
  events: PropTypes.array,
  categories: PropTypes.array,
  className: PropTypes.string,
  onGetEvents: PropTypes.func,
  onAddNewEvent: PropTypes.func,
  onUpdateEvent: PropTypes.func,
  onDeleteEvent: PropTypes.func,
  onGetCategories: PropTypes.func,
};

export default Calender;
