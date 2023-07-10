import * as React from 'react';
import {Card} from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const TaskCard = () => (
  <Card style={{borderRadius: 10, borderColor: '#868686', borderWidth: 2}}>
    <Card.Title
      title="Card Title"
      subtitle="Card Subtitle"
      left={props => <BouncyCheckbox disableBuiltInState fillColor="#29AB87" />}
    />
  </Card>
);

export default TaskCard;
