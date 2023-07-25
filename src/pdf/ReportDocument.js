import {
  Page,
  Text,
  View,
  PDFDownloadLink,
  Document,
  Font,
} from "@react-pdf/renderer";
import bolt from "../fonts/lato-bold.ttf";
import regular from "../fonts/lato-regular.ttf";
import dayjs from "dayjs";

Font.register({
  family: "TitleFont",
  src: bolt,
});
Font.register({
  family: "Regular",
  src: regular,
});

export const ReportDocument = ({ preFilteredData, startDate, endDate }) => {
  const totalAreas = preFilteredData.reduce((acc) => {
    acc += 1;
    return acc;
  }, 0);

  const uniquePublishers = preFilteredData.reduce((acc, item) => {
    const publishers = [...new Set(item.publishers)];
    return [...acc, ...publishers];
  }, []);

  const calculateDays = (data) => {
    let totalDays = 0;

    data.forEach((item) => {
      const { createDate, dateOfEnd } = item;

      if (createDate.length === dateOfEnd.length) {
        for (let i = 0; i < createDate.length; i++) {
          const createDateObj = dayjs(createDate[i], "DD.MM.YYYY");
          const dateOfEndObj = dayjs(dateOfEnd[i], "DD.MM.YYYY");
          const days = dateOfEndObj.diff(createDateObj, "day");
          totalDays += days;
        }
      }
    });

    return totalDays;
  };

  const totalDays = calculateDays(preFilteredData);

  return (
    <PDFDownloadLink
      document={
        <Document>
          <Page style={{ padding: 10 }}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text
                style={{
                  fontFamily: "TitleFont",
                  fontSize: 22,
                  marginTop: 20,
                  marginBottom: 10,
                }}
              >
                ДАННЫЕ О НАЗНАЧЕНИИ УЧАСТКОВ
              </Text>
              <Text>
                {startDate} - {endDate}
              </Text>
            </View>
            {preFilteredData.map((a) => (
              <div>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      width: "50%",
                      backgroundColor: "#f0f0f0",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 5,
                      marginLeft: 2,
                      border: "1px solid black",
                      marginTop: 15,
                    }}
                  >
                    <Text style={{ fontFamily: "TitleFont", fontSize: 15 }}>
                      Номер участка
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "50%",
                      backgroundColor: "#f0f0f0",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 5,
                      marginLeft: 2,
                      border: "1px solid black",
                      marginTop: 15,
                    }}
                  >
                    <Text style={{ fontFamily: "Regular", fontSize: 18 }}>
                      {a.area}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      width: "50%",
                      backgroundColor: "#f2e7ff",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 5,
                      marginLeft: 2,
                      marginTop: 2,
                    }}
                  >
                    <Text style={{ fontFamily: "TitleFont", fontSize: 12 }}>
                      Возвещатель:
                    </Text>
                  </View>
                  {a.publishers.map((publisher) => (
                    <View
                      style={{
                        width: "50%",
                        backgroundColor: "#f2e7ff",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 5,
                        marginLeft: 2,
                        marginTop: 2,
                      }}
                    >
                      <Text style={{ fontFamily: "Regular", fontSize: 12 }}>
                        {publisher}
                      </Text>
                    </View>
                  ))}
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      width: "50%",
                      backgroundColor: "#f9f0ed",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 5,
                      marginLeft: 2,
                      marginTop: 2,
                    }}
                  >
                    <Text style={{ fontFamily: "TitleFont", fontSize: 12 }}>
                      Дата начала:
                    </Text>
                  </View>
                  {a.createDate.map((dateStart) => (
                    <View
                      style={{
                        width: "50%",
                        backgroundColor: "#f9f0ed",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 5,
                        marginLeft: 2,
                        marginTop: 2,
                      }}
                    >
                      <Text style={{ fontFamily: "Regular", fontSize: 12 }}>
                        {dateStart}
                      </Text>
                    </View>
                  ))}
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      width: "50%",
                      backgroundColor: "#f9f0ed",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 5,
                      marginLeft: 2,
                      marginTop: 2,
                      borderBottom: "1px solid black",
                    }}
                  >
                    <Text style={{ fontFamily: "TitleFont", fontSize: 12 }}>
                      Дата окончания:
                    </Text>
                  </View>
                  {a.dateOfEnd.map((dateEnd) => (
                    <View
                      style={{
                        width: "50%",
                        backgroundColor: "#f9f0ed",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 5,
                        marginLeft: 2,
                        marginTop: 2,
                        borderBottom: "1px solid black",
                      }}
                    >
                      <Text style={{ fontFamily: "Regular", fontSize: 12 }}>
                        {dateEnd}
                      </Text>
                    </View>
                  ))}
                </View>
              </div>
            ))}
            <View>
              <Text
                style={{
                  fontFamily: "TitleFont",
                  fontSize: 18,
                  marginTop: 20,
                }}
              >
                Всего участков:{" "}
                <Text style={{ fontFamily: "Regular" }}>{totalAreas}</Text>
              </Text>
              <Text
                style={{
                  fontFamily: "TitleFont",
                  fontSize: 18,
                  marginTop: 5,
                }}
              >
                Возвещателей:{" "}
                <Text style={{ fontFamily: "Regular" }}>
                  {uniquePublishers.length}
                </Text>
              </Text>

              <Text
                style={{
                  fontFamily: "TitleFont",
                  fontSize: 18,
                  marginTop: 5,
                }}
              >
                Всего часов обработки:{" "}
                <Text style={{ fontFamily: "Regular" }}>{totalDays}</Text>
              </Text>
            </View>
          </Page>
        </Document>
      }
      fileName={`Отчет за ${startDate} - ${endDate}.pdf`}
    >
      {({ loading }) => (loading ? "Загрузка..." : "Загрузить отчет")}
    </PDFDownloadLink>
  );
};
