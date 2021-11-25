import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_LISTS: "LOAD_LISTS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    SET_CURRENT_VIEW: "SET_CURRENT_VIEW",
    SET_SEARCH_QUERY: "SET_SEARCH_QUERY"
}

export const CurrentViewType = {
    HOME_SCREEN: "HOME_SCREEN",
    ALL_LISTS: "ALL_LISTS",
    USER_LISTS: "USER_LISTS",
    COMMUNITY_LISTS: "COMMUNITY_LISTS"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {


    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        lists: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        itemActive: false,
        listMarkedForDeletion: null,
        currentView: "HOME_SCREEN",
        searchQuery: null
    });
    const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME NEED TO UPDATE CURRENTLIST
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    lists: store.lists,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentView: store.currentView,
                    searchQuery: store.searchQuery
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    lists: store.lists,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentView: store.currentView,
                    searchQuery: store.searchQuery
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    lists: store.lists,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentView: store.currentView,
                    searchQuery: store.searchQuery
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_LISTS: {
                return setStore({
                    lists: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentView: store.currentView,
                    searchQuery: store.searchQuery
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    lists: store.lists,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: payload,
                    currentView: store.currentView,
                    searchQuery: store.searchQuery
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    lists: store.lists,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentView: store.currentView,
                    searchQuery: store.searchQuery
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    lists: store.lists,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentView: store.currentView,
                    searchQuery: store.searchQuery
                });
            }
            // START EDITING A LIST ITEM
            case GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE: {
                return setStore({
                    lists: store.lists,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: true,
                    listMarkedForDeletion: null,
                    currentView: store.currentView,
                    searchQuery: store.searchQuery
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    lists: store.lists,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: true,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentView: store.currentView,
                    searchQuery: store.searchQuery
                });
            }
            case GlobalStoreActionType.SET_CURRENT_VIEW: {
                return setStore({
                    lists: store.lists,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentView: payload,
                    searchQuery: store.searchQuery
                })
            }
            case GlobalStoreActionType.SET_SEARCH_QUERY: {
                return setStore({
                    lists: store.lists,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    currentView: store.currentView,
                    searchQuery: payload
                })
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    store.handleSearch = async function (searchQuery) {

        // Empty search, restore the usual lists for this view by resetting the search query then calling loadLists() again.
        if (searchQuery === "") {
            storeReducer({
                type: GlobalStoreActionType.SET_SEARCH_QUERY,
                payload: null
            });
            store.loadLists();
            return;
        }
        
        // Else we update store's searchquery then call loadLists() so it can properly filter.
        storeReducer({
            type: GlobalStoreActionType.SET_SEARCH_QUERY,
            payload: `${searchQuery}` // HACK Use template literal to copy the string!!!
        });
    }

    store.homeView = async function () {
        // TODO - MAKE SURE TO LOAD NOTHING FOR A GUEST!!!!
        console.log("Setting current view to: Home");
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_VIEW,
            payload: CurrentViewType.HOME_SCREEN
        });
        store.loadLists();
    }

    store.allView = async function () {
        console.log("Setting current view to: All");
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_VIEW,
            payload: CurrentViewType.ALL_LISTS
        });
        store.loadLists();
    }

    store.userView = async function () {
        console.log("Setting current view to: User");
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_VIEW,
            payload: CurrentViewType.USER_LISTS
        });
        store.loadLists();
    }

    store.communityView = async function () {
        console.log("Setting current view to: Community");
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_VIEW,
            payload: CurrentViewType.COMMUNITY_LISTS
        });
        store.loadLists();
    }
    
    // TODO- This SHOULD work fine since a list name can only be changed by its owner. Might have to look here as
    // possible source of error in the future.
    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = async function (id, newName) {
        if (newName === "") {
            console.log("Renaming empty name list");
            newName = "Untitled";
        }
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.name = newName;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    // reload lists
                    console.log(top5List);
                    
                    storeReducer({
                        type: GlobalStoreActionType.CHANGE_LIST_NAME,
                        payload: top5List   
                    });
                }
            }
            updateList(top5List);
        }
    }


    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });

        history.push("/");
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        let payload = {
            name: newListName,
            items: ["?", "?", "?", "?", "?"],
            ownerEmail: auth.user.email
        };
        const response = await api.createTop5List(payload);
        if (response.data.success) {

            let newList = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            history.push("/top5list/" + newList._id);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // THIS FUNCTION LOADS ALL THE LISTS
    // check the current store view and, after loading all lists, filter accordingly.
    store.loadLists = async function () {

        let ownerEmail = auth.user.email;

        const response = await api.getAllTop5Lists();
        if (response.data.success) {
            let lists = response.data.data;
            console.log(lists);
            console.log("FILTERING LISTS");
            // TODO - filter properly!!!
            // Note that we can have different search queries.
            // If the search query is coming with user lists, we want to filter by users
            // If the search query is coming with any other view, we want to search for a list.
            switch (store.currentView) {
                case CurrentViewType.HOME_SCREEN: 
                    // If logged in, only show user's lists.
                    // Else, that means this is a guest, so load NOTHING!
                    
                    // Afterwards, if we have a search query, filter further.
                    break;
                
                case CurrentViewType.ALL_LISTS: 
                    // Load all published lists for anyone to see!

                    // Afterwards, if we have a search query, filter further.
                    break;
                
                case CurrentViewType.USER_LISTS: 
                    // Check for a user search query and filter accordingly.
                    break;
                
                case CurrentViewType.COMMUNITY_LISTS: 
                    // Make calls to the community list endpoints and parse the info properly.

                    // Afterwards, if we have a search query, filter further.
                    break;
                default:
                    console.log("DEFAULT LOADLIST ERROR");
                    break;
            }
            storeReducer({
                type: GlobalStoreActionType.LOAD_LISTS,
                payload: lists
            });
        }
        else {
            console.log("API FAILED TO GET THE LISTS");
        }
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = async function (id) {
        // GET THE LIST
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
    }

    store.deleteList = async function (listToDelete) {
        let response = await api.deleteTop5ListById(listToDelete._id);
        if (response.data.success) {
            store.loadLists();
            history.push("/");
        }
    }

    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion);
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    store.setCurrentList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            
            
            response = await api.updateTop5ListById(top5List._id, top5List);
            if (response.data.success) {
                console.log("SETTING CURRENT LIST:");
                console.log(top5List);
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: top5List
                });
                history.push("/top5list/" + top5List._id);
            }
        }
    }


    store.updateItem = function (index, newItem) {
        if (newItem === "") {
            newItem = "?";
            console.log("Overwriting empty item rename");
        }
        store.currentList.items[index] = newItem;
        store.updateCurrentList();
    }

    store.updateCurrentList = async function () {
        const response = await api.updateTop5ListById(store.currentList._id, store.currentList);
        if (response.data.success) {
            console.log(response);
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: store.currentList
            });
        }
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
    store.setIsItemEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE,
            payload: null
        });
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };