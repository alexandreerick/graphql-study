import { gql, ApolloServer } from 'apollo-server';

/**
 * Scalar Types
 * - Int
 * - Float
 * - String
 * - Boolean
 * - ID
 */

 const users = [
  {
    id: 1,
    nom_nome: 'Erick Alexandre',
    idade: 22,
    email: "erickalexandrex@gmail.com",
    ativo: true,
    perfil: 1
  },
  {
    id: 2,
    nom_nome: 'Emily Pereira',
    idade: 23,
    email: "emilyemanuela@hotmail.com",
    ativo: true,
    perfil: 2
  }
];

const perfis = [
  {
    id: 1,
    descricao: "ADMIN"
  },
  {
    id: 2,
    descricao: "NORMAL"
  }
]

const typeDefs = gql`
  type User {
    id: ID
    idade: Int
    email: String
    name: String
    ativo: Boolean
    perfil: Perfil
  }

  type Perfil {
    id: ID
    descricao: String
  }

  type Query {
    user(id: Int, name: String): User
    perfis: [Perfil]
  }
`;

const resolvers = {
  User: {
    perfil: (user) => {
      const userPerfil = perfis.find((perfil) => perfil.id === user.perfil);
      return userPerfil
    },
    name: (obj) => {
      return obj.nom_nome
    }
  },
  Query: {
    user: (_, args) => {
      const user = users.find((user) => user.id === args.id);
      return user
    },
    perfis: () => {
      return perfis
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({url}) => console.log(`🔥 Server running at ${url}`));