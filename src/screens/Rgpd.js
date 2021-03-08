import React, { Component} from 'react';
import { View, Text, FlatList, StatusBar, TouchableOpacity, Linking } from 'react-native';
import MenuBtn from '../components/MenuBtn';
import { Actions } from 'react-native-router-flux';
import { ScrollView } from 'react-native-gesture-handler';
import FAQDetailItem from '../components/FAQDetailItem';
import {em} from '../common/constants'
import { goToWebBrowser } from '../common/utils';

const DATA = [
  {
    id: 1,
    type : "title",

    title: "RGPD et Politique de Confidentialité",
    description: "Absolute Micro (ci-après désignée « Absolute Micro » et par les pronoms « nous », « notre », « nôtre » ou « nos ») accorde une importance particulière à la protection des données à caractère personnel et de la vie privée de ses utilisateurs. À cet effet, Absolute Micro s’engage à traiter les données à caractère personnel dans le respect des lois et réglementations en matière de protection des données en vigueur dans les pays à partir desquels ses utilisateurs accèdent aux sites Web Tina(ci-après le « Site ») et les utilisent, notamment le Règlement général européen sur la protection des données (ci-après « RGPD »).La présente Politique de confidentialité expose nos modalités de collecte et de traitement de vos données à caractère personnel dans le contexte de l’utilisation que vous faites du Site. Veuillez lire attentivement les dispositions qui suivent, car elles s’appliquent à chaque fois que vous utilisez le Site. Vous trouverez des informations pertinentes à cet égard dans les catégories suivantes :"  },

  {
    id: 2,
    type : "title",

    title: "1. QUE SONT LES DONNÉES À CARACTÈRE PERSONNEL ?",
    description: "Les données à caractère personnel désignent toute information relative à une personne physique identifiée ou identifiable (la « Personne concernée par les données »). Dans le cadre de l’utilisation que vous faites de notre Site, vous êtes considéré(e)s comme des personnes concernées par les données. Les données à caractère personnel couvertes par la présente Politique de confidentialité sont donc toutes les informations vous concernant, dans la mesure où vous êtes identifié(e)s ou identifiables, par exemple à partir de l’adresse IP de votre appareil ou à partir de vos identifiants de compte. Le traitement des données à caractère personnel est soumis à des dispositions légales et réglementaires spécifiques, en particulier le RGPD.",
  },

  {
    id: 3,
    type : "title",

    title: "2. POURQUOI RECUEILLONS-NOUS VOS DONNÉES À CARACTÈRE PERSONNEL ?",
    description: "Nous recueillons uniquement les données à caractère personnel vous concernant nécessaires à la poursuite de certaines finalités, visant notamment à assurer une expérience d’utilisation optimale du Site, à communiquer facilement avec vous, à vous présenter des publicités personnalisées et, dans certaines circonstances et après avoir obtenu votre consentement, à partager vos données à caractère personnel avec nos partenaires.",
  },
  {
    id: 4,
    type : "title",

    title: "3. EN QUOI MES DONNÉES À CARACTÈRE PERSONNEL SONT-ELLES CONCERNÉES ?",
    description: "Nous recueillons vos données à caractère personnel dans les cas suivants et aux fins détaillées ci-après :",
  },
  {
    id: 5,
    type : "stitle",

    title: "3.1. Lors de l’utilisation du Site",
    description: "Lors de l’accès au Site, nous recueillerons les données à caractère personnel suivantes :\n●	L’adresse IP de votre appareil\n●	La langue du système\n●	Le pays identifié\n●	La langue sélectionnée sur le Site\n●	Les données de géolocalisation\n●	Les données à caractère personnel que vous pourriez nous communiquer lors de la création d’un personnage sur le Site (pseudo, image, description du personnage, langue, etc.) ;\n●	Et toutes les données pertinentes relatives aux événements au sein du Site. Ces données seront recueillies et traitées dans le but de permettre au Site de s’afficher correctement dans votre navigateur. Ce traitement est fondé sur son caractère nécessaire pour l’exécution d’un contrat auquel vous êtes partie, à savoir les Conditions d’utilisation du Site.\nSi vous avez consenti à l’utilisation des cookies décrits à l’Article 7 ci-après, nous serons également en mesure de recueillir des données relatives à l’utilisation que vous faites du Site, notamment les contenus visités, via ces cookies dans le cadre de cette utilisation.\nCes données seront recueillies et traitées dans le but de mesurer l’audience des contenus du Site. Ce traitement est fondé sur notre intérêt légitime à mieux connaître les utilisateurs de notre Site afin d’améliorer ce dernier.\nDes données de géolocalisation peuvent également être traitées à des fins de publicité ciblée sur le Site. Ce traitement est basé sur votre consentement.",
  },
  {
    id:6,
    type : "stitle",

    title: "3.2. Lors de l’utilisation du formulaire « Nous contacter »",
    description: "Lorsque vous utilisez le formulaire « Nous contacter » sur le Site, nous recueillons, par le biais de ce formulaire, les données suivantes :\n●	L’objet de votre message\n●	Le système depuis lequel vous nous écrivez\n●	Votre adresse e-mail\n●	Le contenu de votre message.\nCes données seront recueillies et traitées afin qu’Absolute Micro puisse recevoir et gérer votre message, soit en mesure d’y répondre et puisse résoudre tout problème que vous pourriez rencontrer et que votre message décrit. Ce traitement est basé sur votre consentement, exprimé en cliquant sur le bouton « Envoyer » du formulaire « Nous contacter ».\nDans le cas où votre message contiendrait des données à caractère personnel désignées comme des « données sensibles » en vertu des lois et règlements applicables en matière de protection des données, par exemple des données relatives à votre état de santé, vous consentez explicitement, en cliquant sur le bouton d’envoi du formulaire de contact, à ce qu’Absolute Micro puisse recevoir et traiter ces données afin de répondre à votre message. Il est entendu qu’Absolute Micro n’exige ni n’encourage pas ses utilisateurs à communiquer des données sensibles par le biais du formulaire « Nous contacter ».",
  },
  {
    id: 7,
    type : "title",

    title: "4. QUI EST LE CONTRÔLEUR DES DONNÉES ET PUIS-JE LE CONTACTER ?",
    description: "Le contrôleur des données dans le cadre des activités de traitement susmentionnées est Absolute Micro, qui fournit le Site.\nSi vous avez des questions ou des préoccupations concernant la présente Politique de confidentialité, le traitement des données à caractère personnel par Absolute Micro au sein du Site ou plus généralement les engagements d’Absolute Micro en termes de protection des données et de confidentialité, vous pouvez contacter l’Administrateur de la politique de confidentialité en envoyant un e-mail à l’adresse tina@absolutemicro.fr ou en écrivant à Absolute Micro, à l’attention de : l’Administrateur de la politique de confidentialité, 18 bis route de Bû 78550 Houdan, France.",
  },
  {
    id: 8,
    type : "title",

    title: "5. AVEC QUI MES DONNÉES À CARACTÈRE PERSONNEL SONT-ELLES PARTAGÉES ?",
    description: "Les données à caractère personnel recueillies et traitées conformément à l’Article 3 ci-dessus seront partagées avec le personnel et les services d’Absolute Micro uniquement sur la base du besoin de les connaître, en particulier notre personnel dédié aux problèmes techniques et aux études d’expérience utilisateur.\nDans certains cas spécifiques uniquement, vos données à caractère personnel pourront être partagées pour répondre aux demandes des autorités compétentes et dans le cadre de procédures judiciaires si nécessaire. \nVos données à caractère personnel peuvent également être indirectement recueillies par nos partenaires (Google Analytics, partenaires de développements logiciels et d'applications, et partenaires publicitaires) dans la mesure nécessaire à la poursuite des finalités décrites à l’Article 3 ci-dessus. \nVos données à caractère personnel pourront également être partagées avec nos partenaires afin de vous fournir des contenus et publicités ciblés. Ces partenaires peuvent associer ces données à d’autres données à caractère personnel que vous pourriez leur avoir fournies ou qu’ils peuvent avoir recueillies lorsque vous utilisiez leurs propres services. \nNous ne transférons pas vos données à caractère personnel en dehors de l’Union européenne : tous nos serveurs sont situés dans l’UE et vos données à caractère personnel seront stockées sur ces serveurs. Dans le cas où vos données à caractère personnel seraient indirectement recueillies par nos partenaires puis transférées par leurs soins en dehors de l’Union européenne, nous vous invitons à consulter leur propre politique de confidentialité pour savoir comment ils sécurisent les transferts de vos données à caractère personnel en dehors de l’UE.",
  },
  {
    id: 9,
    type : "title",

    title: "6. COMBIEN DE TEMPS MES DONNÉES À CARACTÈRE PERSONNEL SONT-ELLES CONSERVÉES ?",
    description: "Les données à caractère personnel recueillies et traitées conformément à l’Article 3 ci-dessus seront conservées par Absolute Micro pendant la durée strictement nécessaire à la poursuite des finalités décrites dans cet Article 3. En particulier, nous conserverons vos données à caractère personnel le temps nécessaire pour vous permettre d’accéder au Site et, le cas échéant, pour répondre aux obligations légales d’Absolute Micro.",
  },
  {
    id: 10,
    type : "title",

    title: "7. COMMENT SONT UTILISÉS LES COOKIES ET LES TECHNOLOGIES SIMILAIRES ?",
    description: "",
  },
  {
    id:11,
    type : "stitle",

    title: "7.1. Qu’est-ce qu’un cookie ?",
    description: "Les cookies sont de petits fichiers stockés sur l’appareil d’un utilisateur final (par exemple, un ordinateur ou un smartphone) lors de la visite d’un site Web. Ils peuvent servir à diverses fins, allant de la simple fonction technique pour permettre ou faciliter la navigation, à la collecte de données relatives aux préférences de l’utilisateur final afin de fournir des publicités ciblées sur ses intérêts.",
  },
  {
    id:12,
    type : "stitle",

    title: "7.2. Comment les cookies et technologies similaires sont-ils utilisés sur le Site ?",
    description: "Avec votre consentement, le Site pourra stocker et accéder à des cookies et/ou autres technologies similaires sur votre appareil afin de poursuivre les finalités suivantes:\n●	Analyser l’utilisation que vous faites du Site\n●	Améliorer les contenus\n●	Personnaliser les contenus et la présentation visuelle du Site\n●	Améliorer et personnaliser votre expérience d’utilisation de notre Site\n●	Diffuser de la publicité ciblée sur le Site\nCes cookies peuvent être émis par Absolute Micro et ses partenaires.\nLe Site peut également utiliser des cookies et/ou des technologies similaires dans le seul but (purement technique) de vous permettre de vous connecter et d’accéder au Site.\nVous pouvez vous opposer au stockage des cookies et à l’accès à ces derniers sur votre appareil en utilisant les paramètres appropriés de votre navigateur.  Pour ce faire, veuillez consulter la documentation de ce logiciel principal, en utilisant les liens suivants : Mozilla Firefox ; Internet Explorer ; Google Chrome ; Opera ; Safari. Nous attirons toutefois votre attention sur le fait que les cookies constituent un élément essentiel au bon fonctionnement de notre Site ; par conséquent, si vous choisissez de refuser certains cookies, cela pourra, dans certains cas, vous empêcher d’utiliser le Site ou impacter négativement l’affichage ou le fonctionnement de ce dernier ou de certaines zones ou fonctionnalités du Site.",
  },
  {
    id: 13,
    type : "title",

    title: "8. QUELS SONT MES DROITS ?",
    description: "Conformément aux lois et règlements applicables en matière de protection des données, vous disposez des droits suivants concernant le traitement de vos données à caractère personnel : droit d’accès, droit de portabilité des données, droit de rectification, droit d’effacement, droit d’opposition au traitement et droit de limitation du traitement.\nVous pouvez exercer ces droits en contactant l’Administrateur de la politique de confidentialité à l’adresse tina@absolutemicro.fr ou en écrivant à Absolute Micro, à l’attention de : l’Administrateur de la politique de confidentialité, 6 rue de la Prévôté, 78550 Houdan, France.\nCes droits étant purement personnels, ils ne peuvent être exercés que par les personnes concernées par les données.  Par conséquent, vous pourrez être appelé(e) à fournir une copie d’une pièce d’identité valide dans le cadre de votre demande ; nous ne conserverons cette copie que pendant le temps nécessaire à la vérification de votre identité.\nSi ces données à caractère personnel ont été partagées avec des tiers, Absolute Micro informera ces tiers de votre demande d’effacement, dans la mesure du possible. Dans ce cas, Absolute Micro cessera de traiter les données à caractère personnel concernées et les conservera pendant la durée appropriée.\nPour les activités de traitement basées sur votre consentement décrites à l’Article 2 ci-dessus, vous avez le droit de retirer ce consentement à tout moment, sans justification. Vous pouvez à tout moment vous opposer aussi bien à l’activation qu’à l’exercice de cette collecte, sur simple demande.\nEnfin, vous avez le droit de déposer une réclamation concernant le traitement de vos données à caractère personnel par Absolute Micro auprès de l’autorité de contrôle compétente dans votre pays.",
  },
  {
    id: 14,
    type : "title",

    title: "9. COMMENT MES DONNÉES À CARACTÈRE PERSONNEL SONT-ELLES SÉCURISÉES ?",
    description: "Nous prenons des mesures raisonnables pour protéger les Données à caractère personnel contre toute utilisation abusive, toute perte et tout accès non autorisé et nous avons notamment mis en place des garanties physiques, électroniques et procédurales pour protéger les Données à caractère personnel. De plus, les Données à caractère personnel sont stockées sur nos serveurs et protégées par des réseaux sécurisés dont l’accès est strictement limité à quelques employé(e)s et membres du personnel autorisé(e)s. Vous devez cependant savoir que, étant donné ses caractéristiques intrinsèques, l’utilisation d’Internet n’est pas sécurisée à 100 %.",
  },
  {
    id: 15,
    type : "title",

    title: "10. SITES WEB OU APPLICATIONS DE TIERS",
    description: "Nos services fournis par le biais du Site peuvent contenir des liens qui vous permettront de quitter notre Site et d’accéder à un autre site Web ou une autre application. Ces sites Web ou applications ne sont pas sous le contrôle d’Absolute Micro et il est possible qu’ils aient une politique de confidentialité différente de la nôtre. Notre Politique de confidentialité s’applique exclusivement aux Données à caractère personnel recueillies lorsque vous utilisez notre Site et nous ne sommes aucunement responsables de ces autres sites Web. Nous vous conseillons vivement de faire preuve de prudence lors de l’utilisation de vos Données à caractère personnel en ligne.",
  },
  {
    id: 16,
    type : "title",

    title: "11. MODIFICATION DE LA PRÉSENTE POLITIQUE DE CONFIDENTIALITÉ",
    description: "La présente Politique de confidentialité a été mise à jour pour la dernière fois le 22 juin 2020. Veuillez noter que nous sommes susceptibles de la réviser de temps à autre et que nous nous réservons le droit de la mettre à jour ou de la modifier.\nNous afficherons la Politique de confidentialité révisée sur le Site afin que les utilisateurs puissent toujours savoir quelles données à caractère personnel nous recueillons et comment nous les recueillons.",
  }
]

class Rgpd extends Component {
  constructor(props){
    super(props)
  }

  convertPropToData = () => {
    const {faq} = this.props;
    const data = [{id:faq.id, title:faq.title,type: faq.type, description:faq.description}];
    const answerKeys = Object.keys(faq.answers).reverse();
    answerKeys.map(item => {
      data.push({...faq.answers[item], id:item})
    })
    return data;
  }

  render(){
    /*const DATA = this.convertPropToData();
    let content = DATA.map((item, index) => 
      <FAQDetailItem key={item.id.toString()} id={item.id} index={index} title={item.title} description={item.description} />
    );*/

    let content = DATA.map((item, index) => 
      <FAQDetailItem key={item.id.toString()} id={item.id} index={index} title={item.title} type = {item.type} description={item.description} />
    );

    return (
        <View style={styles.mainContainer}>
          <StatusBar barstyle="light-content" backgroundColor={"#28c7ee"} />

          <ScrollView style={{flex:1, paddingLeft: 20*em, paddingRight: 20*em}}>
            {content}
          </ScrollView>
          
          <View style={styles.menuWrapper}>
            <MenuBtn image={"back"} onPress={() => Actions.pop()}/>                  
          </View>
        </View>
    )
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: '#f6f5fa',
    flexDirection: 'column',
  },

  headerContainer: {
    flex: 1
  },

  menuWrapper:{
    position:"absolute", 
    left:20*em,
    top:20*em
  },

  descText:{
    fontSize: 13*em,
    fontFamily:"OpenSans-SemiBold"
  },

  bottomTitle:{
    justifyContent:"center", 
    alignItems:"center",
    flexDirection:"column", 
    paddingTop: 30*em, 
    paddingBottom:80*em
  }
}

export default Rgpd;