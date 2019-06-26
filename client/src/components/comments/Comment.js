import React from "react";
import moment from "moment";

export default function Comment(props) {
  const { _id, author, text, date } = props.comment;
  return (
    <div className="media mb-3">
      <img
        className="mr-3 bg-light rounded"
        // width="48"
        // height="48"
        src={`https://api.adorable.io/avatars/48/${author}@adorable.io.png`}
        alt={author}
      />

      <div className="media-body p-2 shadow-sm rounded bg-light border">
        <small className="float-right text-muted">
          {moment(date).format("MM/DD/YYYY, h:mm a")}
        </small>
        <h6 className="mt-0 mb-1 text-muted text-left">{author}</h6>
        <h6 className="mt-0 mb-1 text-left">{text}</h6>
      </div>
    </div>
  );
}
