module.exports = `
  type Tag {
    id: ID
    title: String
  }
  type User {
    id: ID
    email: String
    fullname: String
    bio: String
    shareditems: [Item]
    imageurl: String
  }

  type Item {
    id: ID
    title: String
    description: String
    itemowner: User
    borrower: User
    imageurl: String
    created: String
    tags: [Tag]
  }
  input TagInput {
    id: ID
  }
  input AddItemInput {
    imageurl: String
    title: String
    description: String
    itemowner: ID
    tags: [TagInput]
  }
  input UpdateItemInput {
    id: ID
    borrower: ID
  }

  type Mutation {
    addItem(newItem: AddItemInput): Item
    updateItem(updatedItem: UpdateItemInput): Item
  }

  type Query {
    items: [Item]
    item(id: ID): Item
    users: [User]
    user(id: ID): User
    allTags: [Tag]
  }
`;
