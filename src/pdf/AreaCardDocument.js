import {
  Page,
  Text,
  View,
  PDFDownloadLink,
  Document,
  Font,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import bolt from "../fonts/lato-bold.ttf";
import regular from "../fonts/lato-regular.ttf";
import { createImageURL } from "../utils";
import avatar from "../img/avatar.png";

Font.register({
  family: "TitleFont",
  src: bolt,
});
Font.register({
  family: "Regular",
  src: regular,
});

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    justifyContent: "start",
    alignItems: "start",
    padding: 20,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  table: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fdf4e2",
  },
  tableHeader: {
    padding: 5,
    fontFamily: "TitleFont",
  },
  tableHeaderText: {
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#efe6fd",
  },
  tableCell: {
    fontFamily: "Regular",
    fontSize: 14,
    marginBottom: 2,
  },
  text: {
    fontFamily: "TitleFont",
    marginBottom: 3,
    fontSize: 16,
  },
});

export const AreaCardDocument = ({ dataAreaById }) => {
  const publisher = dataAreaById?.publisher?.fullName;
  const group = dataAreaById?.group?.name;
  const subGroup = dataAreaById?.subgroup?.name;
  const event = dataAreaById?.event?.nameEvent;
  const subEvent = dataAreaById?.subevent?.name;
  const latestHistory =
    dataAreaById?.histories?.[dataAreaById.histories.length - 1];
  const latestDateEnd = latestHistory?.dateOfEnd;

  return (
    <PDFDownloadLink
      document={
        <Document>
          <Page style={{ padding: 10 }}>
            <View style={styles.conteiner}>
              <Text style={styles.text}>
                Участок:{" "}
                <Text style={{ fontFamily: "Regular", fontSize: 16 }}>
                  {dataAreaById?.number}
                </Text>
              </Text>
              {group && (
                <Text style={styles.text}>
                  Группа:{" "}
                  <Text style={{ fontFamily: "Regular", fontSize: 16 }}>
                    {dataAreaById?.group?.name}
                  </Text>
                </Text>
              )}
              {subGroup && (
                <Text style={styles.text}>
                  Подгруппа:{" "}
                  <Text style={{ fontFamily: "Regular", fontSize: 16 }}>
                    {dataAreaById?.subgroup?.name}
                  </Text>
                </Text>
              )}
              {publisher && (
                <Text style={styles.text}>
                  Возвещатель:{" "}
                  <Text style={{ fontFamily: "Regular", fontSize: 16 }}>
                    {dataAreaById?.publisher?.fullName}
                  </Text>
                </Text>
              )}
              {event && (
                <Text
                  style={{
                    fontFamily: "TitleFont",
                    marginTop: 20,
                    fontSize: 16,
                  }}
                >
                  Текущая группа событий:{" "}
                  <Text style={{ fontFamily: "Regular", fontSize: 16 }}>
                    {event}
                  </Text>
                </Text>
              )}
              {subEvent && (
                <Text style={{ fontFamily: "TitleFont", marginTop: 20 }}>
                  Текущее событие:{" "}
                  <Text style={{ fontFamily: "Regular", fontSize: 16 }}>
                    {subEvent}
                  </Text>
                </Text>
              )}
              <Text style={styles.text}>
                Дата сдачи:{" "}
                <Text style={{ fontFamily: "Regular", fontSize: 16 }}>
                  {new Date(latestDateEnd).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </Text>
              </Text>

              <Image
                src={createImageURL(dataAreaById?.image?.url) || avatar}
                style={{
                  width: 300,
                  marginLeft: 120,
                  marginTop: 20,
                }}
              />

              <View style={styles.table}>
                <Text style={styles.tableHeader}>Дата сдачи:</Text>
                <Text style={styles.tableHeader}>История:</Text>
              </View>
              {dataAreaById?.histories?.map((history) => (
                <View style={styles.tableRow} key={history.id}>
                  <Text style={styles.tableCell}>
                    {formatDate(history.dateOfEnd)}
                  </Text>
                  <Text style={styles.tableCell}>{history.description}</Text>
                </View>
              ))}
            </View>
          </Page>
        </Document>
      }
      fileName={`Карточка Участка_#${dataAreaById?.number}_${
        dataAreaById?.publisher?.fullName || ""
      }.pdf`}
    >
      {({ loading }) => (loading ? "Загрузка..." : "Карточка PDF")}
    </PDFDownloadLink>
  );
};

function formatDate(date) {
  if (!date) return "";
  const formattedDate = new Date(date);
  const day = String(formattedDate.getDate()).padStart(2, "0");
  const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
  const year = formattedDate.getFullYear();
  return `${day}.${month}.${year}`;
}
