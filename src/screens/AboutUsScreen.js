import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import AboutUsCard from '../components/AboutUsCard';

const AboutUsScreen = () => {
  return (
    <View style={styles.container}>
      <AboutUsCard
        title="About Us"
        content={`Lorem ipsum dolor sit amet, consetetur sadipscing elitr, magna aliquyam erat, sed diam voluptua.\nAt vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, takimata sanctus est Lorem ipsum dolor sit amet.`}
      />
      <AboutUsCard
        title="Company"
        content="DigiMark Developers"
        image={require('../../assets/images/building.png')}
      />
      <AboutUsCard
        title="Email"
        content="info@digimarkdevelopers.com"
        image={require('../../assets/images/email.png')}
      />
          <AboutUsCard
            title="Website"
            content="www.digimarkdevelopers.com"
            image={require('../../assets/images/webicon.png')}
          />
      <AboutUsCard
        title="Contact"
        content="+92 3339048500"
        image={require('../../assets/images/phone.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AboutUsScreen;
