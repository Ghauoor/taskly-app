import * as React from 'react';
import {Avatar, Card, IconButton} from 'react-native-paper';

const ProfileCard = () => (
  <Card.Title
    title="Card Title"
    subtitle="Card Subtitle"
    right={props => (
      <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
    )}
  />
);

export default ProfileCard;
