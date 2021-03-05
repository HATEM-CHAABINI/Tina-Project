import React, { Component, Fragment } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, Platform } from 'react-native'
import Modal from 'react-native-modal'
import Button from './Button'
import stripe from 'tipsi-stripe'
import { initStripe } from '../common/stripe/stripe';
const CREDIT_CARD_IMAGE = require('../Assets/menu-payment.png')
const AMERICAN_EXPRESS_CARD_IMAGE = require('../Assets/american-express.png')
const DISCOVER_CARD_IMAGE = require('../Assets/discover.png')
const MASTER_CARD_IMAGE = require('../Assets/master-card.png')
const VISA_CARD_IMAGE = require('../Assets/visa.png')
const ARROW_RIGHT_IMAGE = require('../Assets/arrow-right.png')
var { height, width } = Dimensions.get('window');


export default class ConfirmPaymentModal extends Component {
  state = {}

  renderTitle = (onPressCancel) => {
    return (
    
      <View style={styles.titleContainer}>
        <View style={styles.titleLeft}>
          <Text style={styles.titleLeftText}>
            {'Payer'}
          </Text>
        </View>
        <View style={styles.titleRight}>
          <TouchableOpacity onPress={() => onPressCancel()}>
            <Text style={styles.titleRightText}>
              {'Annuler'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderEmptyCard = (onPressScanCard) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemLeft}>
          <Image
            source={CREDIT_CARD_IMAGE}
            resizeMode='cover'
            style={styles.itemLeftImage}
          />
        </View>
        <View style={styles.itemCenter}>
          <Text style={styles.itemCenterText}>
            {`no card`}
          </Text>
        </View>
        <TouchableOpacity style={styles.itemRight} onPress={onPressScanCard}>
          <Image
            source={ARROW_RIGHT_IMAGE}
            resizeMode='cover'
            width={20}
            style={styles.itemRightImage}
          />
        </TouchableOpacity>
      </View>
    )
  }

  renderCardInfo = (token, onPressScanCard) => {
    const { country, brand, last4, expMonth, expYear, funding} = token.card;
    var cardImage = CREDIT_CARD_IMAGE;
    if (brand === 'Visa') cardImage = VISA_CARD_IMAGE;
    else if (brand === 'American Express') cardImage = AMERICAN_EXPRESS_CARD_IMAGE;
    else if (brand === 'Discover') cardImage = DISCOVER_CARD_IMAGE;
    else if (brand === 'MasterCard') cardImage = MASTER_CARD_IMAGE;

    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemLeft}>
          <Image
            source={cardImage}
            resizeMode='contain'
            style={styles.itemLeftImage}
          />
        </View>
        <View style={styles.itemCenter}>
          <Text style={styles.itemCenterText}>
            {`Carte de crédit`}
          </Text>
          <Text style={styles.itemCenterText}>
            {`**** **** **** ${last4}`}
          </Text>
        </View>
        <TouchableOpacity style={styles.itemRight} onPress={onPressScanCard}>
          <Image
            source={ARROW_RIGHT_IMAGE}
            resizeMode='cover'
            width={20}
            style={styles.itemRightImage}
          />
        </TouchableOpacity>
      </View>
    );
  };

  //from renderContactInfo
  //<View style={styles.itemCenter}>
    //      <Text style={styles.itemCenterText}>
      //      bruno@tina.fr
        //  </Text>
        //</View>

  renderContactInfo = () => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemLeftText}>CONTACT</Text>
        </View>
      
        <TouchableOpacity style={styles.itemRight} onPress={this.onClearCard}>
          <Image
            source={ARROW_RIGHT_IMAGE}
            resizeMode='cover'
            width={20}
            style={styles.itemRightImage}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderTotal = () => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemLeft}>
        </View>
        <View style={styles.itemCenter}>
          <Text style={styles.totalText}>
            Total
          </Text>
        </View>
        <TouchableOpacity style={styles.itemRight} onPress={this.onClearCard}>
          <Text style={styles.itemRightText}>19.00 €</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderButton = (onPressPayer) => {
    //stripe.completeApplePayRequest();
    return (
      <View style={styles.buttonContainer}>
        <Button
          caption={'Payer'}
          bgColor='#35cdfa'
          textColor='#ffffff'
          borderRadius={15}
          containerHeight={40}
          onPress={onPressPayer}
        />
      </View>
    )
  }

  renderListDivider = () => (<View style={styles.listDivider} />);
  renderTitleDivider = () => (<View style={styles.titleDivider} />);

  render() {
    const {
      isModalVisible,
      onPressPayer,
      onPressCancel,
      onPressScanCard,
      token
    } = this.props;
    return (
      <Modal
        isVisible={isModalVisible}
        // animationIn={'slideInLeft'}
        // animationOut={'slideOutLeft'}
        swipeDirection={['up', 'down']}
        hasBackdrop
        backdropOpacity={0.7}
        coverScreen
        style={styles.modal}
        onBackdropPress={() => onPressCancel()}
      >
        <View style={styles.container}>
          {this.renderTitle(onPressCancel)}
          {this.renderTitleDivider()}
          {(token && token.card) ? 
            this.renderCardInfo(token, onPressScanCard) : 
            this.renderEmptyCard(onPressScanCard)
          }
          {this.renderListDivider()}
          {this.renderContactInfo()}
          {this.renderListDivider()}
          {this.renderTotal()}
          {this.renderButton(onPressPayer)}
        </View>
      </Modal>
    );
  }
}

const styles = {
  modal: {
    marginLeft: 0,
    marginRight: 0,
    justifyContent: 'flex-end',
  },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 40,
    paddingBottom: 0,
    paddingHorizontal: 20,
    backgroundColor: '#cdcdcd',
    height: height/5 * 3,
    width: width,
    bottom: 0
  },
  titleContainer: {
    // marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  titleLeft: {
    flex: 5,
    alignItems: 'flex-start'
  },
  titleLeftText: {
    fontSize: 20,
    color: '#000000',
    fontWeight: '500',
  },
  titleRight: {
    flex: 5,
    alignItems: 'flex-end'
  },
  titleRightText: {
    fontSize: 19,
    color: '#007AFF',
    fontWeight: '500',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    // paddingTop: 10,
    // paddingBottom: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: 'grey',
  },
  itemLeft: {
    flex: 3,
    marginRight: 15,
    alignItems: 'flex-end'
  },
  itemLeftImage: {
    width: 50,
    height: 35
  },
  itemLeftText: {
    color: '#76767A',
  },
  itemCenter: {
    flex: 5,
    alignItems: 'flex-start'
  },
  itemCenterText: {
    color: '#000000',
  },
  itemRight: {
    flex: 2,
    alignItems: 'flex-end',
  },
  itemRightArrow: {
    color: '#007AFF',
    tinColor: '#007AFF'
  },
  itemRightText: {
    color: '#000000',
  },
  itemRightImage: {
    // color: '#007AFF',
    // tinColor: '#007AFF'
  },
  totalText: {
    color: '#818186',
  },
  buttonContainer: {
    position: 'absolute',
    left: 10,
    bottom: 40,
    // paddingHorizontal: 20,
    width: width - 20,
  },
  listDivider: {
    height: 1,
    marginLeft: 30,
    margingRight: 0,
    backgroundColor: "#adadad",
    width: width,
  },
  titleDivider: {
    height: 1,
    width: width,
    marginLeft: -20,
    backgroundColor: "#adadad",
  },
}

// export default ConfirmPaymentModal;