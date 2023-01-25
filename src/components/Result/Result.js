/* eslint-disable eqeqeq */
import React, { createRef } from "react";
import { Col, Form, Row, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Result.css";
import axios from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ref = createRef();

const Result = ({
  userData,
  marketing,
  goals,
  challenges,
  ideas,
  websites,
  softwareCompanies,
  publicResultLink,
  LinkGeneration,
  prompt1,
  prompt2,
  prompt3,
  prompt4,
  prompt5,
  shortUrl,
  token,
  domainName,
}) => {
  function splitLink(data) {
    for (var i = 0; i < data?.length; i++) {
      if (!data[i].includes("http") && !data[i].includes("www.")) {
        data[i] = data[i] + "https://google.com";
      } else if (data[i].includes("( https://www.")) {
        data[i] = data[i].replace("( https://www.", "https://");
        data[i] = data[i].replace(")", "");
      } else if (data[i].includes("https://www.")) {
        data[i] = data[i].replace("https://www.", "https://");
      } else if (data[i].includes("(https://www.")) {
        data[i] = data[i].replace("(https://www.", "https://");
        data[i] = data[i].replace(")", "");
      } else if (data[i].includes("http://www.")) {
        data[i] = data[i].replace("http://www.", "https://");
      } else if (data[i].includes("(http://www.")) {
        data[i] = data[i].replace("(http://www.", "https://");
      } else if (data[i].includes("(https")) {
        data[i] = data[i].replace("(https", "https");
      } else if (data[i].includes("(http")) {
        data[i] = data[i].replace("(http", "https");
      } else if (data[i].includes("www.")) {
        data[i] = data[i].replace("www.", "https://");
      } else if (data[i].includes("( www.")) {
        data[i] = data[i].replace("( www.", "https://");
        data[i] = data[i].replace(")", "");
      } else if (data[i].includes("(www.")) {
        data[i] = data[i].replace("(www.", "https://");
        data[i] = data[i].replace(")", "");
      }
    }
    return data;
  }

  //formatting the raw strings coming from openAI

  const formatedIdeas = ideas[0]?.text.split(/\d+\./);
  const splittedIdeas = splitLink(formatedIdeas);
  const formatedChallenges = challenges[0].text.split(/\d+\./);
  const formatedMarktingData = marketing[0]?.text.split(/\d+\./);
  const formatedWebsite = websites[0]?.text.split(/\d+\./);
  const splittedWebsites = splitLink(formatedWebsite);
  const formattedSoftwareCompanies = softwareCompanies[0]?.text.split(/\d+\./);
  const splittedCompanies = splitLink(formattedSoftwareCompanies);
  const personalizedLink = publicResultLink;
  const shortLink = shortUrl;

  return (
    <>
      <Row className="justify-content-md-center">
        <Col md={7} style={{ marginLeft: "10px" }}>
          <Form
            className="my-3 bg-light pb-3 shadow mb-3 rounded"
            style={{ height: "72vh" }}
          >
            <div ref={ref} style={{ height: "auto" }}>
              <div
                className="mb-4 p-4"
                style={{ height: "72vh", overflowY: "scroll" }}
              >
                <div className="mb-4 p-4">
                  <h1
                    style={{
                      marginLeft: "20px",
                      marginBottom: "40px",
                      color: "#1F5014",
                    }}
                  >
                    {userData?.agencyName} Plan in 2023
                  </h1>
                  <div className="article-title">
                    <h5>Challenges for {userData?.agencyName} </h5>
                  </div>
                  {formatedChallenges?.slice(1, 11).map((item, index) => (
                    <p key={item} className="paragraph-text">
                      {index + 1}. {item}
                    </p>
                  ))}

                  <h5 style={{ marginLeft: "20px" }}>
                    Solutions for {userData?.agencyName} in 2023
                  </h5>
                  <div className="article-title">
                    <h5>
                      Ideas for {userData?.agencyName} fundraising and Resources
                    </h5>
                  </div>
                  {splittedIdeas ? (
                    splittedIdeas?.slice(1, 11).map((item, index) => (
                      <p key={item} className="paragraph-text">
                        {index + 1}. {item.substring(0, item.indexOf("https"))}
                        <a href={item.substring(item.indexOf("https"))}>
                          {item.substring(item.indexOf("https")).split("/")[2]}
                        </a>
                      </p>
                    ))
                  ) : (
                    <h4>
                      Generating...
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </h4>
                  )}
                  <div className="article-title">
                    <h5>
                      Marketing ideas for {userData?.agencyName} and Resources
                    </h5>
                  </div>
                  {formatedMarktingData ? (
                    formatedMarktingData?.slice(1, 11).map((item, index) => (
                      <p key={item} className="paragraph-text">
                        {index + 1}.{item}
                      </p>
                    ))
                  ) : (
                    <h4>
                      Generating...
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </h4>
                  )}
                  <div className="article-title">
                    <h5>
                      Fundraising Option For {userData?.agencyName} and Where to
                      Apply
                    </h5>
                  </div>
                  {splittedWebsites ? (
                    splittedWebsites?.slice(1, 11).map((item, index) => (
                      <p key={item} className="paragraph-text">
                        {index + 1}. {item.substring(0, item.indexOf("https"))}
                        <a href={item.substring(item.indexOf("https"))}>
                          {item.substring(item.indexOf("https")).split("/")[2]}
                        </a>
                      </p>
                    ))
                  ) : (
                    <h4>
                      Generating...
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </h4>
                  )}
                  <div className="article-title">
                    <h5>
                      Top Web and Software Development Company For{" "}
                      {userData?.agencyName}
                    </h5>
                  </div>
                  {splittedCompanies ? (
                    splittedCompanies?.slice(1, 6).map((item, index) => (
                      <p key={item} className="paragraph-text">
                        {index + 1}. {item.substring(0, item.indexOf("https"))}
                        <a href={item.substring(item.indexOf("https"))}>
                          {item.substring(item.indexOf("https")).split("/")[2]}
                        </a>
                      </p>
                    ))
                  ) : (
                    <h4>
                      Generating...
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </h4>
                  )}
                </div>
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Result;
