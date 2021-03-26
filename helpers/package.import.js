import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { createApi } from "unsplash-js";
import {
  Row,
  Col,
  InputGroupText,
  InputGroupAddon,
  Button,
  InputGroup,
  Label,
  Input,
} from "reactstrap";
import { motion } from "framer-motion";
import Link from "next/link";
import Cookie from "js-cookie";
import { parseCookies } from "nookies";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GitHubLogin from "react-github-login";
import parse from "html-react-parser";
import imageCompression from "browser-image-compression";

export {
  useState,
  useEffect,
  useContext,
  useRouter,
  Link,
  Image,
  createApi,
  Row,
  Col,
  motion,
  Cookie,
  parseCookies,
  GoogleLogin,
  FacebookLogin,
  GitHubLogin,
  parse,
  InputGroupText,
  InputGroupAddon,
  Button,
  InputGroup,
  Label,
  Input,
  imageCompression,
};
