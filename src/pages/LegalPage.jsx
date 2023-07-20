import { Box, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { LenguageContext } from "../context/lenguage.context";

const Legal = () => {
  const { t } = useContext(LenguageContext);

  return (
    t?.legal && (
      <Box padding="20px">
        <Text fontWeight="bold" marginBottom="10px">
          {t?.legal.title || "Privacy Policy"}
        </Text>
        <Text marginBottom="40px">
          {t?.legal.intro ||
            "This Privacy Policy governs the manner in which Musart collects, uses, maintains, and discloses information collected from users of the Musart mobile application. This Privacy Policy applies to the App and all products and services offered by Musart."}
        </Text>

        <Text fontWeight="bold" marginBottom="10px">
        {t?.legal.personalIdentificationInfoTitle || "Personal Identification Information"}
        </Text>

        <Text marginBottom="40px">
          {t?.legal.personalIdentificationInfo ||
            "Musart may collect personal identification information from Users in a variety of ways, including when Users register on the App and provide their name, email address, and password. The personal identification information collected is used for authentication purposes and to enhance the user experience within the App. Musart is committed to ensuring that the User's personal information is kept confidential and secure."}
        </Text>

        <Text fontWeight="bold" marginBottom="10px">
          {t?.legal.nonPerIdInTitle ||
            "Non-Personal Identification Information"}
        </Text>

        <Text marginBottom="40px">
          {t?.legal.nonPerIdIn ||
            "Musart may also collect non-personal identification information about Users whenever they interact with the App. This information may include the type of device used, the operating system, the browser name, and other technical details related to the User's interaction with the App. This information is collected to improve the App's functionality and to provide a better user experience."}
        </Text>

        <Text fontWeight="bold" marginBottom="10px">
          {t?.legal.usOfTitle || "Use of Collected Information"}
        </Text>

        <Text marginBottom="40px">
          {t?.legal.useOfCollectedInfo ||
            "Musart may use the collected information for the following purposes: - To provide and personalize the User's experience: The information collected allows Musart to customize the App's content and features to better suit the User's preferences and interests. - To improve customer service: The information helps Musart respond to user support requests more efficiently and provide effective customer service. - To send periodic emails: Musart may use the provided email address to send the User updates, notifications, and important information related to the App. The User can opt-out of receiving such communications by contacting Musart or using the unsubscribe link provided in the emails."}
        </Text>

        <Text fontWeight="bold" marginBottom="10px">
          {t?.legal.protectionOfUserInfoTitle ||
            "Protection of User Information"}
        </Text>

        <Text marginBottom="40px">
          {t?.legal.protectionOfUserInfo ||
            "Musart takes appropriate security measures to protect User information against unauthorized access, alteration, disclosure, or destruction. This includes maintaining appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access to User information."}
        </Text>

        <Text fontWeight="bold" marginBottom="10px">
          {t?.legal.sharingOfUserInfoTitle || "Sharing of User Information"}
        </Text>

        <Text marginBottom="40px">
          {t?.legal.sharingOfUserInfo ||
            "Musart does not sell, trade, or rent User's personal identification information to others. User information is strictly used for the purposes mentioned in this Privacy Policy and is only accessible to authorized Musart personnel or service providers who need to know the information to provide services on behalf of Musart."}
        </Text>

        <Text fontWeight="bold" marginBottom="10px">
        {t?.legal.changesToPolicyTitle || "Changes to this Privacy Policy"}
        </Text>

        <Text marginBottom="40px">
        {t?.legal.changesToPolicy || "Musart reserves the right to update or modify this Privacy Policy at any time. Users are encouraged to check this Privacy Policy periodically for any changes. Continued use of the App after the modifications will constitute the User's acknowledgment and acceptance of the updated Privacy Policy."}
        </Text>

        <Text fontWeight="bold" marginBottom="10px">
        {t?.legal.contactUsTitle || "Contact Us"}
        </Text>

        <Text marginBottom="40px">
        {t?.legal.contactUsInfo || "If Users have any questions or concerns about this Privacy Policy or the practices of the Musart App, they can contact us at angpepeles@gmail.com."}
        </Text>
      </Box>
    )
  );
};

export default Legal;
