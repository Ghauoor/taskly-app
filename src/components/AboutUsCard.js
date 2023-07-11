import React from 'react';
import {Card, Text} from 'react-native-paper';
import {Image, View} from 'react-native';

const AboutUsCard = props => (
  <Card
    elevation={5}
    style={{
      marginHorizontal: 16,
      shadowRadius: 10,
      shadowOpacity: 0.5,
      marginTop: 10,
      backgroundColor: '#FFFFFF',
    }}>
    <Card.Content
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Text style={{fontWeight: 'bold'}} variant="titleLarge">
        {props.title}
      </Text>
      {props.image && (
        <View style={{alignItems: 'center'}}>
          <Image
            source={props.image}
            style={{
              width: 35,
              height: 35,
              resizeMode: 'contain',
              marginLeft: 12,
            }}
          />
        </View>
      )}
    </Card.Content>
    <Card.Content>
      <Text variant="bodyMedium">{props.content}</Text>
    </Card.Content>
  </Card>
);

export default AboutUsCard;
