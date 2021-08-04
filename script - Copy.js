const Demo4 = {
  data() {
    return {
      newItem: "",
      loaded: true,
      items: [
        {
          task: "wash dishes",
          complete: true,
          id: 1
        },
        {
          task: "sweep the floor",
          complete: false,
          id: 2
        },
        {
          task: "walk the dog",
          complete: true,
          id: 3
        },
        {
          task: "sort the recycling",
          complete: false,
          id: 3
        },
        {
          task: "put away xmas decorations",
          complete: false,
          id: 3
        }
      ],
      activeList: []
    };
  },
  computed: {
    defaultList() {
      return (this.activeList = this.items);
    },
    completeList() {
      return this.items.filter((item) => item.complete);
    },
    incompleteList() {
      return this.items.filter((item) => !item.complete);
    },
    taskTotal() {
      return this.items.length;
    }
  },
  methods: {
    queryList(list) {
      return this.activeList === list;
    },
    addItem() {
      if (this.newItem) {
        this.items.push({
          task: this.newItem,
          completed: false,
          id: this.items.length + 1
        });
        this.newItem = "";
      }
    },
    toggleComplete(item) {
      item.complete = !item.complete;
    },
    deleteItem(item) {
      const itemsIndex = this.items.indexOf(item);
      this.items.splice(itemsIndex, 1);
    },
    clearList() {
      this.items = [];
      this.loaded = false;
    }
  }
};

Vue.createApp(Demo4).mount("#container");