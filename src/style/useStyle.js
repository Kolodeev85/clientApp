import {
  deepPurple,
  orange,
  red,
  purple,
  grey,
  blue,
  green,
  yellow,
} from "@mui/material/colors";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => {
  const { palette, breakpoints } = theme;
  return {
    btn: {
      backgroundColor: palette.grey[300],
      color: palette.secondary.main,
      borderRadius: 40,
      pading: "6px 12px 6px 12px",
      border: `1px solid ${palette.grey.A400}`,
      boxShadow: "none",
      marginBottom: 10,
      "&:hover": {
        backgroundColor: "#fffde7",
        color: palette.secondary.main,
        border: `1px solid ${palette.primary.main}`,
      },
    },
    createBtn: {
      backgroundColor: palette.secondary.main,
      color: palette.secondary.light,
      borderRadius: 40,
      boxShadow: 15,
      width: "120%",
      padding: 16,

      "&:hover": {
        backgroundColor: palette.primary.main,
        color: palette.secondary.main,
      },
      [breakpoints.down(1450)]: {
        borderRadius: 50,
        padding: 30,
        height: 2,
        position: "fixed",
        right: "5%",
        bottom: "5%",
        width: 10,
      },
      [breakpoints.down(795)]: {
        borderRadius: 50,
        padding: 30,
        height: 2,
        position: "absolute",
        right: "5%",
        top: "30%",
        width: 10,
      },
    },
    createBtn2: {
      [breakpoints.down(1450)]: {
        backgroundColor: palette.primary.main,
        borderRadius: 50,
        padding: 30,
        height: 2,
        position: "fixed",
        right: "5%",
        bottom: "3%",
        width: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&:hover": {
          backgroundColor: palette.secondary.main,
          color: palette.secondary.light,
        },
      },
    },
    createPublisherBtn: {
      backgroundColor: palette.secondary.main,
      color: palette.secondary.light,
      borderRadius: 40,
      boxShadow: 15,
      width: "100%",
      padding: 16,
      "&:hover": {
        backgroundColor: palette.primary.main,
        color: palette.secondary.main,
      },
      [breakpoints.down(1450)]: {
        borderRadius: 50,
        padding: 30,
        height: 2,
        position: "fixed",
        right: "5%",
        bottom: "5%",
        width: 10,
      },
    },
    addBtn: {
      backgroundColor: palette.primary.main,
      color: palette.secondary.main,
      borderRadius: 40,
      boxShadow: 15,
      width: "25%",
      padding: 16,

      "&:hover": {
        backgroundColor: palette.secondary.main,
        color: palette.secondary.light,
      },
      [breakpoints.down(1450)]: {
        borderRadius: 50,
        padding: 30,
        height: 2,
        position: "fixed",
        right: "-2%",
        bottom: "15%",
        width: 10,
      },
      [breakpoints.down(1050)]: {
        borderRadius: 50,
        padding: 30,
        height: 2,
        position: "fixed",
        right: "-10%",
        bottom: "-5%",
        width: 10,
      },
      [breakpoints.down(580)]: {
        borderRadius: 50,
        padding: 30,
        height: 2,
        position: "fixed",
        right: "-25%",
        bottom: "1%",
        width: 10,
      },
    },
    addBtnPub: {
      backgroundColor: palette.primary.main,
      color: palette.secondary.main,
      borderRadius: 40,
      boxShadow: 15,
      width: "25%",
      padding: 16,

      "&:hover": {
        backgroundColor: palette.secondary.main,
        color: palette.secondary.light,
      },
      [breakpoints.down(1450)]: {
        borderRadius: 50,
        padding: 30,
        height: 2,
        position: "fixed",
        right: "-5%",
        bottom: "10%",
        width: 10,
      },
      [breakpoints.down(1200)]: {
        borderRadius: 50,
        padding: 30,
        height: 2,
        position: "fixed",
        right: "-5%",
        bottom: "-3%",
        width: 10,
      },
      [breakpoints.down(1000)]: {
        right: "-5%",
        bottom: "1%",
      },
      [breakpoints.down(600)]: {
        right: "-20%",
        bottom: "1%",
      },
      [breakpoints.down(500)]: {
        right: "-25%",
        bottom: "1%",
      },
      [breakpoints.down(370)]: {
        right: "-30%",
        bottom: "-3%",
      },
    },
    btnIsActive: {
      backgroundColor: palette.secondary.main,
      color: palette.secondary.light,
      border: "none",
    },
    enterBtn: {
      backgroundColor: orange["A700"],
      color: "white",
      borderRadius: 40,
      boxShadow: 15,
      width: "20%",
      ml: "40%",
      padding: 16,
      "&:hover": {
        backgroundColor: deepPurple[500],
      },
    },
    btbCreatGroup: {
      backgroundColor: palette.primary.main,
      color: palette.secondary.main,
      borderRadius: 40,
      boxShadow: 15,
      width: "100%",
      padding: 16,
      "&:hover": {
        backgroundColor: palette.secondary.main,
        color: palette.secondary.light,
      },
    },
    btnCreatSubGroup: {
      backgroundColor: palette.primary.main,
      color: palette.secondary.main,
      borderRadius: 40,
      boxShadow: 15,
      width: "100%",
      padding: 16,
      "&:hover": {
        backgroundColor: palette.secondary.main,
        color: palette.secondary.light,
      },
    },
    btnCreatEvent: {
      backgroundColor: palette.primary.main,
      color: palette.secondary.main,
      borderRadius: 40,
      boxShadow: 15,
      width: "100%",
      padding: 16,
      "&:hover": {
        backgroundColor: palette.secondary.main,
        color: palette.secondary.light,
      },
    },
    btnCreatSubEvent: {
      backgroundColor: palette.primary.main,
      color: palette.secondary.main,
      borderRadius: 40,
      boxShadow: 15,
      width: "100%",
      padding: 16,
      "&:hover": {
        backgroundColor: palette.secondary.main,
        color: palette.secondary.light,
      },
    },
    btnIssue: {
      backgroundColor: palette.primary.main,
      color: palette.secondary.main,
      borderRadius: 40,
      boxShadow: 15,
      width: "40%",
      padding: 16,
      marginLeft: "60%",
      marginTop: 20,
      "&:hover": {
        backgroundColor: palette.secondary.main,
        color: palette.secondary.light,
      },
    },
    btnIssueLink: {
      width: "40%",
      padding: 16,
      marginLeft: "80%",
      marginTop: 20,
      [breakpoints.down(1100)]: {
        marginLeft: "70%",
      },
      [breakpoints.down(600)]: {
        marginLeft: "60%",
      },
    },
    btnReturnArea: {
      backgroundColor: palette.primary.main,
      color: palette.secondary.main,
      borderRadius: 40,
      boxShadow: 15,
      width: "40%",
      padding: 16,
      marginLeft: "55%",
      "&:hover": {
        backgroundColor: palette.secondary.main,
        color: palette.secondary.light,
      },
    },
    btnTo: {
      color: palette.secondary.main,
      fontWeight: 500,
      marginLeft: 15,
      "&:hover": {
        backgroundColor: yellow[50],
      },
    },
    btnTo2: {
      color: palette.secondary.main,
      fontWeight: 500,
      marginLeft: 15,
      "&:hover": {
        backgroundColor: yellow[50],
      },
    },
    btnEnd: {
      color: red[500],
      fontWeight: 500,
      "&:hover": {
        backgroundColor: red[50],
      },
    },
    btnActive: {
      color: green[700],
      fontWeight: 500,
      "&:hover": {
        backgroundColor: green[50],
      },
    },
    btnGroop: {
      color: palette.secondary.main,
      fontWeight: 500,
      border: `1px solid ${palette.primary.main}`,
      marginTop: 25,
      "&:hover": {
        backgroundColor: palette.secondary.main,
        color: palette.secondary.light,
      },
    },
    btnGroop2: {
      color: deepPurple[500],
      fontWeight: 500,
      width: "100%",
      border: `1px solid ${deepPurple[500]}`,
      marginTop: 25,
      "&:hover": {
        backgroundColor: purple[50],
      },
    },
    btnCreateEvent: {
      color: orange[500],
      fontWeight: 500,
      border: `1px solid ${orange[500]}`,
      marginTop: 10,
      width: "60%",
      marginLeft: "20%",
      "&:hover": {
        backgroundColor: purple[50],
      },
    },
    btnUploadAvatar: {
      color: palette.secondary.main,
      fontWeight: 500,
      border: `1px solid ${palette.primary.main}`,
      "&:hover": {
        backgroundColor: palette.secondary.main,
        color: palette.secondary.light,
      },
    },
    btnArrow: {
      "&:hover": {
        backgroundColor: "rgba(98, 0, 238, 0.08)",
        color: deepPurple[500],
      },
    },
    btnCloseTeamList: {
      height: 50,
      width: 50,
      marginLeft: "90%",
      marginTop: "-7%",
      [breakpoints.down(1240)]: {
        marginTop: "-12%",
      },
      [breakpoints.down(950)]: {
        marginTop: "-15%",
      },
      [breakpoints.down(800)]: {
        marginTop: "-17%",
      },
      [breakpoints.down(650)]: {
        marginTop: "-23%",
        marginLeft: "85%",
      },
      [breakpoints.down(450)]: {
        marginTop: "-26%",
        marginLeft: "85%",
      },
      [breakpoints.down(350)]: {
        marginTop: "-55%",
        marginLeft: "75%",
      },
    },
    boxArea: {
      height: "auto",
      width: "auto",
      backgroundColor: "white",
      borderRadius: 8,
      transition: "transform 0.2s ease-in-out",
      "&:hover": {
        transform: "scale(1.05)",
        border: `2px solid ${palette.secondary.main}`,
      },
    },
    imgAvatar: {
      width: "100%",
      height: 150,
      objectFit: "cover",
      marginBottom: 10,
    },
    imgAvatarArea: {
      width: "auto",
      height: 300,
      objectFit: "cover",
      marginBottom: 10,
      [breakpoints.down(1500)]: {
        height: 400,
      },
      [breakpoints.down(950)]: {
        height: "auto",
      },
    },
    fw600: {
      fontWeight: 600,
    },
    btnList: {
      "&:hover": {
        backgroundColor: grey[60],
        color: palette.secondary.main,
      },
    },
    badgeFree: {
      color: "white",
      backgroundColor: blue[500],
      width: 80,
    },
    badgeBusy: {
      color: "white",
      backgroundColor: "#2e7d32",
      width: 67,
    },
    badgeInactive: {
      color: "white",
      backgroundColor: grey[900],
      width: 84,
    },
    badgeDetainees: {
      color: "white",
      backgroundColor: "#d32f2f",
      width: 95,
    },
    srOnly: {
      position: "absolute",
      width: 1,
      height: 1,
      margin: -1,
      border: 0,
      pading: 0,
      clip: "rect( 0 0 0 0)",
      overflow: "hidden",
    },
    modalWindow: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: 400,
      width: "30%",
      height: "auto",
      bgcolor: "background.paper",
      border: `1px groove ${deepPurple[500]}`,
      zIndex: 9999,
      [breakpoints.down(1015)]: {
        width: "50%",
      },
      [breakpoints.down(620)]: {
        width: "70%",
      },
      [breakpoints.down(500)]: {
        width: "99%",
      },
    },
    modalWindowCreateIssueForm: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: 800,
      height: "auto",
      width: "50%",
      bgcolor: "background.paper",
      border: `1px groove ${deepPurple[500]}`,
      [breakpoints.down(450)]: {
        width: "99%",
      },
    },
    modalWindowPassOffForm: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: 800,
      height: "auto",
      width: "50%",
      bgcolor: "background.paper",
      border: `1px groove ${deepPurple[500]}`,
      [breakpoints.down(780)]: {
        width: "70%",
      },
      [breakpoints.down(450)]: {
        width: "99%",
      },
    },
    modalZoomImage: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "800px",
      height: "auto",
    },
    tableCell: {
      color: palette.secondary.main,
      fontWeight: 600,
      fontSize: "18px",
    },
    notAreas: {
      width: "380%",
      padding: 20,
    },
    notPublishers: {
      width: "200%",
      padding: 20,
      paddingLeft: "210%",
    },
    searchInput: {
      width: "100%",
    },
    mainHeader: {
      marginTop: 40,
      marginBottom: 10,
      marginLeft: 19,
      position: "relative",
      [breakpoints.down(1450)]: {
        marginTop: 15,
      },
    },
    position: {
      position: "sticky",
      top: 1,
      zIndex: 99,
      backgroundColor: "white",
      boxShadow: `0px 2px 4px -1px`,
    },
    formCreate: {
      paddingLeft: 92,
      paddingRight: 153,
      paddingBottom: 21,
      [breakpoints.down(1050)]: {
        paddingLeft: 50,
        paddingRight: 50,
      },
    },
    h1Create: {
      paddingLeft: 91,
      paddingTop: 58,
      paddingBottom: 35,
      fontWeight: 600,
      ml: "40%",
      color: palette.secondary.main,
      [breakpoints.down(1050)]: {
        paddingLeft: 50,
      },

      [breakpoints.down(990)]: {
        fontSize: 35,
      },
      [breakpoints.down(590)]: {
        fontSize: 25,
      },
    },
    enterImage: {
      width: 700,
      [breakpoints.down(1200)]: {
        width: 500,
      },
      [breakpoints.down(950)]: {
        width: 400,
      },
    },
    stask1: {
      [breakpoints.down(950)]: {
        paddingTop: 50,
      },
    },
    mainBoxCreatForm: {
      padding: 52,
      backgroundColor: "#FAF9F9",
      [breakpoints.down(600)]: {
        padding: 20,
      },
      [breakpoints.down(500)]: {
        padding: 0,
      },
    },
    mainBoxCreatForm2: {
      padding: 52,
      backgroundColor: "#FAF9F9",
      [breakpoints.down(600)]: {
        padding: 20,
        paddingTop: 50,
      },
      [breakpoints.down(500)]: {
        padding: 0,
        paddingTop: 50,
      },
    },
    imageNotAreas: {
      width: 800,
      [breakpoints.down(1100)]: {
        width: 500,
      },
      [breakpoints.down(520)]: {
        width: 400,
      },
    },
    h1AreasNotFound: {
      color: deepPurple[500],
      [breakpoints.down(1250)]: {
        paddingTop: 130,
      },
      [breakpoints.down(520)]: {
        width: "100%",
      },
    },
    alertContent: {
      marginBottom: 32,
      paddingTop: 32,
      flexWrap: "wrap",
    },
    staskItemPanel: {
      padding: 16,
      [breakpoints.down(830)]: {
        paddingLeft: 20,
        paddingRight: 20,
      },
      [breakpoints.down(500)]: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    staskItemPanelHead: {
      padding: 65,
      [breakpoints.down(550)]: {
        padding: 20,
      },
    },
    paperIssueForm: {
      padding: 40,
      [breakpoints.down(670)]: {
        padding: 20,
      },
    },
    iconBtnIssueForm: {
      marginLeft: "95%",
      marginTop: -10,
      [breakpoints.down(670)]: {
        marginLeft: "85%",
      },
    },
    h5IssueForm: {
      marginBottom: 30,
      fontWeight: "520",
      color: palette.secondary.main,
      [breakpoints.down(480)]: {
        fontSize: 20,
      },
    },
    LineChart1: {
      width: 650,
      height: 300,
    },
    Stack1AddNewPub: {
      paddingLeft: 93,
      paddingRight: 93,
      paddingBottom: 21,
      [breakpoints.down(1000)]: {
        paddingLeft: 30,
        paddingRight: 30,
      },
    },
    h1AddPub: {
      paddingLeft: 90,
      paddingTop: 58,
      paddingBottom: 35,
      fontWeight: 600,
      color: palette.secondary.main,
      [breakpoints.down(1000)]: {
        paddingLeft: 30,
        fontSize: 35,
      },
      [breakpoints.down(800)]: {
        fontSize: 25,
      },
      [breakpoints.down(550)]: {
        fontSize: 18,
      },
    },
    closeIconAddPub: {
      height: 50,
      width: 50,
      marginRight: 4,
      marginTop: 4,
    },
  };
});
