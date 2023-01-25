import React, { useState } from "react";
import { Col, Row, Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Home.css";
import Result from "../Result/Result";
import Header from "../Header";
import Footer from "../Footer";
import axios from "../../utils/axios";
import moment from "moment";

const { Configuration, OpenAIApi } = require("openai");

function Home() {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const [bdData, setBdData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [marketing, setMarketing] = useState([]);
  const [goals, setGoals] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [websites, setWebsites] = useState([]);
  const [softwareCompanies, setSoftwareCompanies] = useState([]);
  const [publicResultLink, setPublicResultLink] = useState();
  const [prompt1, setPrompt1] = useState();
  const [prompt2, setPrompt2] = useState();
  const [prompt3, setPrompt3] = useState();
  const [prompt4, setPrompt4] = useState();
  const [prompt5, setPrompt5] = useState();
  const [customToken, setCustomToken] = useState();
  const [shortUrl, setShortUrl] = useState();
  const [domainName, setDomainName] = useState();

  const [isLoading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  document.title = "Your Non Profit Resources by SJ Innovation";

  const onSubmit = async (data) => {
    setUserData(data);
    setLoading(true);

    const domainName = data?.domainName?.toString();
    setDomainName(domainName);
    const splittingDomain = domainName.replace("www.", "");
    const splittingDomain1 = splittingDomain;
    setCustomToken(splittingDomain1);
    const short_url = `/result/${splittingDomain1}`;
    setShortUrl(short_url);

    const message1 = `What are some challenges faced by ${data?.agencySize?.toString()} ${data?.nonProfitType?.toString()} non profit organization in ${data?.city?.toString()}, ${data?.state?.toString()}`;
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `What are some challenges faced by ${data?.agencySize?.toString()} ${data?.nonProfitType?.toString()} non profit organization in ${data?.city?.toString()}, ${data?.state?.toString()}`,
      max_tokens: 1500,
      temperature: 1,
    });
    setPrompt1(message1);
    setBdData(completion?.data?.choices);
    setChallenges(completion?.data?.choices);
    const message2 = `Give me 10 ideas for fundraising for ${data?.nonProfitType?.toString()} non profit organization based in ${data?.city?.toString()}, ${data?.state?.toString()} with related resource url.`;
    const completion2 = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Give me 10 ideas for fundraising for ${data?.nonProfitType?.toString()} non profit organization based in ${data?.city?.toString()}, ${data?.state?.toString()} with related resource url.`,
      max_tokens: 1500,
      temperature: 1,
    });
    setPrompt2(message2);
    setIdeas(completion2?.data?.choices);
    const message3 = `10 marketing ideas with website url for non profit organization based in ${data?.city?.toString()}, ${data?.state?.toString()} on ${data?.nonProfitType?.toString()}. Make it Personalized for ${data?.agencyName?.toString()}`;
    const completion5 = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `10 marketing ideas for non profit organization based in ${data?.city?.toString()}, ${data?.state?.toString()} on ${data?.nonProfitType?.toString()}. Make it Personalized for ${data?.agencyName?.toString()}`,
      max_tokens: 1500,
      temperature: 1,
    });
    setPrompt3(message3);
    setMarketing(completion5?.data?.choices);
    const message4 = `Suggest 10 places with website links ${data?.agencyName?.toString()} can apply for funds for ${data?.nonProfitType?.toString()}`;
    const completion6 = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Suggest 10 places with website links ${data?.agencyName?.toString()} can apply for funds for ${data?.nonProfitType?.toString()}`,
      max_tokens: 1500,
      temperature: 1,
    });
    setPrompt4(message4);
    setWebsites(completion6?.data?.choices);
    const message5 = `Make a list of 10 Software development agency in Queens, New York including sjinnovation.com . Write each company's Location and url in "https://" format. Do not write any intro sentence before list`;
    const completion7 = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Make a list of 10 Software development agency in Queens, New York including sjinnovation.com . Write each company's Location and url. Do not write any intro sentence before list`,
      max_tokens: 1500,
      temperature: 1,
    });
    setPrompt5(message5);
    setSoftwareCompanies(completion7?.data?.choices);

    setLoading(false);
    reset();

    const params = {
      agencyName: data?.agencyName?.toString(),
      agencySize: data?.agencySize?.toString(),
      city: data?.city?.toString(),
      state: data?.state?.toString(),
      nonProfitType: data?.nonProfitType?.toString(),
      frameWorks: data?.selectedFramework?.toString(),
    };
    const publicResultLink = `/result?agencyName=${params.agencyName}&agencySize=${params.agencySize}&city=${params.city}&state=${params.state}&type=${params.nonProfitType}&frameWorks=${params.frameWorks}`;
    setPublicResultLink(publicResultLink);

    const localURL = 'http://localhost:3001';

    axios.post(`${localURL}/api/results/saveQuery`, {
      name: params.agencyName,
      size: params.agencySize,
      city: params.city,
      state: params.state,
      type: params.nonProfitType,
      framework: params.frameWorks,
      first_prompt: message1,
      second_prompt: message2,
      third_prompt: message3,
      fourth_prompt: message4,
      fifth_prompt: message5,
      token: splittingDomain1,
      full_url: publicResultLink,
      short_url: short_url,
      domainName: domainName,
    });
  };

  const nonProfitType = [
    "Educational",
    "Health",
    "Environmental",
    "Social services",
    "Arts and culture",
    "Religion",
    "Community development",
    "International aid",
    "Political",
    "Animals",
    "Sports and recreation",
  ];

  const frameWorks = [
    "Wordpress",
    "HubSpot",
    "WooCommerce",
    "Drupal",
    "Wix",
    "Magento",
    "Shopify",
    "Squarespace",
    "Others/Not Sure",
  ];

  return (
    <div>
      <Header />
      <div className="rt-home my-2">
        {bdData.length === 0 ? (
          <Row className="justify-content-md-center">
            <Col md="auto" style={{ margin: "10px" }}>
              <Form
                className="mt-3 bg-light p-4 shadow mb-3 rounded"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div
                  className="article-title"
                  style={{
                    marginLeft: "0px",
                    marginRight: "0px",
                    marginBottom: "20px",
                  }}
                >
                  <h4 style={{ marginLeft: "20px" }}>
                    Please fill up the below information to proceed
                  </h4>
                </div>
                <Row style={{ overFlowY: "scroll" }}>
                  <div className="col-md-4">
                    <Form.Group
                      className="mb-4"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label style={{ color: "#1F5014" }} sm={2}>
                        Non Profit Name*
                      </Form.Label>
                      <Form.Control
                        {...register("agencyName", { required: true })}
                        type="text"
                        placeholder="xyz co"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group
                      className="mb-4"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label style={{ color: "#1F5014" }} sm={2}>
                        Domain Name*
                      </Form.Label>
                      <Form.Control
                        {...register("domainName", { required: true })}
                        type="text"
                        placeholder="www.example.com"
                        pattern="^(?:www\.)[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group
                      className="mb-4"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label style={{ color: "#1F5014" }} sm={2}>
                        Total Employees{" "}
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        {...register("agencySize", { required: false })}
                      >
                        <option>Select Size</option>
                        <option value="small">(1-10)</option>
                        <option value="small">(11-20)</option>
                        <option value="medium">(21-50)</option>
                        <option value="large">50+</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <Col>
                    <Form.Group
                      className="mb-4"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label style={{ color: "#1F5014" }} sm={2}>
                        City*
                      </Form.Label>
                      <Form.Control
                        {...register("city", { required: true })}
                        type="text"
                        placeholder="Bronx"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      className="mb-4"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label style={{ color: "#1F5014" }} sm={2}>
                        State*
                      </Form.Label>
                      <Form.Control
                        {...register("state", { required: true })}
                        type="text"
                        placeholder="New York"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <div className="mb-4">
                      <Form.Label style={{ color: "#1F5014" }} sm={2}>
                        {" "}
                        Non Profit Type{" "}
                      </Form.Label>
                      {nonProfitType.map((item, index) => (
                        <Form.Check
                          key={index}
                          id={item}
                          label={item}
                          value={item}
                          {...register("nonProfitType", { required: false })}
                        />
                      ))}
                    </div>
                  </Col>
                  <Col>
                    <div className="mb-4">
                      <Form.Label style={{ color: "#1F5014" }} sm={2}>
                        {" "}
                        Technology{" "}
                      </Form.Label>
                      {frameWorks.map((item, index) => (
                        <Form.Check
                          key={index}
                          id={item}
                          label={item}
                          value={item === "others" ? "" : item}
                          {...register("selectedFramework", {
                            required: false,
                          })}
                        />
                      ))}
                    </div>
                  </Col>
                </Row>
                {isLoading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  <div>
                    <Button
                      variant="primary"
                      type="submit"
                      style={{ backgroundColor: "#1F5014" }}
                    >
                      Submit
                    </Button>
                  </div>
                )}
              </Form>
            </Col>
            <div style={{ marginBottom: "50px" }}></div>
          </Row>
        ) : (
          <Result
            userData={userData}
            marketing={marketing}
            goals={goals}
            challenges={challenges}
            ideas={ideas}
            websites={websites}
            softwareCompanies={softwareCompanies}
            publicResultLink={publicResultLink}
            prompt1={prompt1}
            prompt2={prompt2}
            prompt3={prompt3}
            prompt4={prompt4}
            prompt5={prompt5}
            shortUrl={shortUrl}
            token={customToken}
            domainName={domainName}
          ></Result>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
