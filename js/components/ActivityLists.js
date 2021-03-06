import React, {
  Component,
  View,
  Text,
  ListView,
  StyleSheet,
  TextInput,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import ActivityList from './ActivityList';
import { fetchActivityLists, createActivity } from '../actions';


class ActivityLists extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchActivityLists());
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id
    });

    const rows = this.props.activitylists.data.map(e => {
      return {
        id: e._id,
        name: e.name
      };
    });

    this.state = {
      dataSource: ds.cloneWithRows(rows),
    };
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight onPress={() => this.onRowPress(rowData)}>
        <View>
          <View style={styles.row}>
            <Text style={styles.text}>
              {rowData.name}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  onRowPress(rowData) {
    this.props.navigator.push({
      title: rowData.name,
      component: ActivityList,
      rightButtonTitle: 'Add Activity',
      onRightButtonPress: () => this.props.dispatch(createActivity(rowData.id)),
      passProps: {
        listId: rowData.id
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderSeparator={(sectionID, rowID) =>
            <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F6F6F6',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  text: {
    flex: 1,
  },
});

function mapStateToProps(state) {
  const { activitylists } = state;
  return {
    activitylists
  };
}

export default connect(mapStateToProps)(ActivityLists);
