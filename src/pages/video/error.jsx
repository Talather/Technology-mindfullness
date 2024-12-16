import React from "react"
import { useNavigate } from "react-router-dom"

const ErrorPage = ({ error, onRetry }) => {
  const navigate = useNavigate()

  return (
    <div
      style={{
        textAlign: "center",
        padding: "2rem",
        backgroundColor: "#97c5bf",
        color: "white",
        border: "1px solid #97c5bf",
        borderRadius: "8px",
        maxWidth: "600px",
        margin: "2rem auto",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ fontSize: "1.7rem", margin: "1rem 0" }}>
        Video Not Found For the Selected Grade and School.
      </h1>
      <p style={{ fontSize: "1.2rem", margin: "1rem 0" }}>
        {error?.message || "Please Change Grade and Try Again"}
      </p>

      <div>
        {/* Retry Button (if provided) */}
        {onRetry && (
          <button onClick={onRetry} style={buttonStyle}>
            Retry
          </button>
        )}

        {/* Go Back Button */}
        <button onClick={() => navigate(-1)} style={{backgroundColor:"red",color:"white",marginTop:"1vh"}}>
          Go Back
        </button>
      </div>
    </div>
  )
}

const buttonStyle = {
  margin: "0.5rem",
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  color: "#fff",
  backgroundColor: "#dc3545",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
}

buttonStyle[":hover"] = {
  backgroundColor: "#c82333",
}

export default ErrorPage
