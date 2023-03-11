import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Image, StatusBar, View, StyleSheet, Animated, Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import getRealm from '../../../services/realm';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Voltar from '../../../../assets/images/Voltar.png';
import Gradient from '../../../components/Gradient';
import Colors from '../../../styles/globalColors';

import {
  ContainerSup,
  ContainerPass,
  ContainerBallInform,
  Ball,
} from './styles';

const screenWidth = Dimensions.get('window').width;

const dataMissions = [
  {
    name: 'Bônus de Inspeção de Equipamentos',
    icon: 'inspecao',
  },
  {
    name: 'Projeto de Inovação',
    icon: 'inovacao',
  },
  {
    name: 'Contador de Passos',
    icon: 'contadorPassos',
  },
  {
    name: 'Escorregador',
    icon: 'escorregador',
  },
  {
    name: 'Banco',
    icon: 'banco',
  },
  {
    name: 'Basquetebol',
    icon: 'basquetebol',
  },
  {
    name: 'Barra Fixa',
    icon: 'barraFixa',
  },
  {
    name: 'Dança do robô',
    icon: 'dancaRobo',
  },
  {
    name: 'Bocha',
    icon: 'bocha',
  },
  {
    name: 'Tombamento de Pneu',
    icon: 'tombamentoPneu',
  },
  {
    name: 'Telefone Celular',
    icon: 'celular',
  },
  {
    name: 'Esteira',
    icon: 'esteira',
  },
  {
    name: 'Máquina de Remo',
    icon: 'maquinaRemo',
  },
  {
    name: 'Aparelho de Ginástica',
    icon: 'ginastica',
  },
  {
    name: 'Unidades de Saúde',
    icon: 'unidadesSaude',
  },
  {
    name: 'Precisão',
    icon: 'precisao',
  },
];

const dataSubMissions = [
  {
    description: 'Se todos os seus equipamentos couberem no espaço de inspeção pequeno',
    number: 0,
    mission_name: 'Bônus de Inspeção de Equipamentos',
  },
  {
    description: 'Se o seu Projeto de Inovação tem pelo menos duas peças',
    number: 0,
    mission_name: 'Projeto de Inovação',
  },
  {
    description: 'Se a ponta do indicador estiver sobre a cor',
    number: 0,
    mission_name: 'Contador de Passos',
  },
  // Escorregador
  {
    description: 'Boneco(s) fora do escorregador',
    number: 0,
    mission_name: 'Escorregador',
  },
  {
    description: 'Se um dos bonequinhos estiver completamente na área do robô',
    number: 1,
    mission_name: 'Escorregador',
  },
  {
    description: 'Se um dos bonequinhos estiver completamente fora de contato com o tapete, sobre o pneu pesado, sem estar tocando em mais nada',
    number: 2,
    mission_name: 'Escorregador',
  },

  // Banco
  {
    description: 'Se o banco estiver completamente abaixado',
    number: 0,
    mission_name: 'Banco',
  },
  {
    description: 'Se o banco estiver completamente abaixado e houver cubos tocando o tapete nos espaços de amarelinha',
    number: 1,
    mission_name: 'Banco',
  },
  {
    description: 'Se o encosto tiver sido completamente removido dos seus buracos de encaixe',
    number: 2,
    mission_name: 'Banco',
  },

  // Basquetebol
  {
    description: 'Se houver um cubo dentro do caixote (pontos serão computados apenas para um cubo)',
    number: 0,
    mission_name: 'Basquetebol',
  },
  {
    description: 'Se o caixote estiver apoiado sobre a trava branca no meio/cima',
    number: 1,
    mission_name: 'Basquetebol',
  },

  // Barra fixa
  {
    description: 'Se o robô passar completamente sob a estrutura da barra fixa a qualquer momento | Se a barra fixa estiver segurando 100% do robô fora do tapete no final do round',
    number: 0,
    mission_name: 'Barra Fixa',
  },

  // Dança do robô
  {
    description: 'Se o controlador do robô estiver, pelo menos parcialmente, sobre a pista de dança, movendo-se como se estivesse fazendo um "dança" no final do round',
    number: 0,
    mission_name: 'Dança do robô'
  },

  // Bocha
  {
    description: 'Se o modelo lançador de cada equipe enviou apenas um cubo para qualquer lugar da arena adversária e os cubos são da mesma cor',
    number: 0,
    mission_name: 'Bocha'
  },
  {
    description: 'Se houver cubos completamente dentro da sua quadra ou alvo',
    number: 1,
    mission_name: 'Bocha'
  },
  {
    description: 'Se houver, pelo menos, um cubo amarelo completamente dentro do seu alvo',
    number: 2,
    mission_name: 'Bocha'
  },

  // Tombamento de Pneu
  {
    description: 'Se o pneu leve (banda azul) estiver com a parte central branca virada para cima e apoiado sobre o tapete',
    number: 0,
    mission_name: 'Tombamento de Pneu'
  },
  {
    description: 'Se o pneu pesado (banda preta) estiver com a parte central branca virada para cima e apoiado sobre o tapete',
    number: 1,
    mission_name: 'Tombamento de Pneu'
  },
  {
    description: 'Se os pneus estiverem completamente dentro do círculo alvo grande, com as partes centrais brancas viradas para cima e apoiados sobre o tapete',
    number: 2,
    mission_name: 'Tombamento de Pneu'
  },

  // Telefone Celular
  {
    description: 'Se o telefone celular estiver com o lado branco virado para cima e apoiado somente sobre o tapete',
    number: 0,
    mission_name: 'Telefone Celular'
  },

  // Esteira
  {
    description: 'Se o robô girar os roletes de modo que o ponteiro aponte para o',
    number: 0,
    mission_name: 'Esteira',
  },

  // Máquina de Remo
  {
    description: 'Se a roda móvel estiver completamente fora do círculo grande',
    number: 0,
    mission_name: 'Máquina de Remo',
  },
  {
    description: 'Se a roda móvel estiver completamente dentro do círculo pequeno',
    number: 1,
    mission_name: 'Máquina de Remo',
  },

  // Aparelho de Ginástica
  {
    description: 'Se o robô girar os roletes de modo que o ponteiro aponte para o',
    number: 0,
    mission_name: 'Aparelho de Ginástica',
  },

  // Unidades de Saúde
  {
    description: 'Se as unidades da saúde estiverem: • Tocando a logo RePLAY ou a área cinza ao redor do banco',
    number: 0,
    mission_name: 'Unidades de Saúde',
  },
  {
    description: 'Com a argola pendurada em uma das barras verticais da barra fixa como ilustrado - máximo de quatro - e sem tocar em nenhum equipamento',
    number: 1,
    mission_name: 'Unidades de Saúde',
  },

  // Precisão
  {
    description: 'Se o número de discos de precisão restantes na arena for',
    number: 0,
    mission_name: 'Precisão',
  },
]

const ThreeScreenTutorial: React.FC = () => {
  const [opacity] = useState(new Animated.Value(0));
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 100 }));
  const navigation = useNavigation();

  async function handleNavigate() {
    await createDataMision();

    await AsyncStorage.setItem('@Inicial', 'True');
    navigation.navigate('Workspace');
  }

  async function createDataMision() {
    const realm = await getRealm();

    realm.write(() => {
      // Salvando as missões
      const missions = dataMissions.map(mission => {
        const missionSave = realm.create('Mission', {
          name: mission.name,
          icon: mission.icon,
        });
        return missionSave;
      });

      let id = -1;
      const subMissions = dataSubMissions.map(subMission => {
        id++;
        return realm.create('SubMission', {
          id,
          description: subMission.description,
          number: subMission.number,
          mission_name: subMission.mission_name
         })
      })
    });
  }

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 0.1,
        bounciness: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, offset]);

  return (
    <>
      <StatusBar backgroundColor={Colors.red} />
      <ContainerSup>
        <MaterialIcon name="equalizer" color={Colors.textWhite} size={108} />
      </ContainerSup>
      <Gradient>
        <Animated.View style={[styles.animated, { opacity: opacity }]}>
          <View />
          <Animated.Text
            style={[styles.text, { transform: [{ translateY: offset.y }] }]}
          >
            Acompanhe as estatísticas completas de seus testes
          </Animated.Text>
          <ContainerPass>
            <ContainerBallInform>
              <Ball color={Colors.black} />
              <Ball color={Colors.black} />
              <Ball color={Colors.black} />
            </ContainerBallInform>
            <RectButton onPress={handleNavigate}>
              <Image source={Voltar} />
            </RectButton>
          </ContainerPass>
        </Animated.View>
      </Gradient>
    </>
  );
};

const styles = StyleSheet.create({
  animated: {
    flex: 1,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: screenWidth > 350 ? 24 : 18,
    fontFamily: 'Poppins-Regular',
    color: Colors.textWhite,

    alignSelf: 'center',
    textAlign: 'left',
    maxWidth: 250,
  },
});

export default ThreeScreenTutorial;
