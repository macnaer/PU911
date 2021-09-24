import { useEffect } from 'react';
import { connect } from "react-redux";

// Import API Service
import apiService from "../../../Services/APIService";
// Import actions
import { getAllContacts } from "../../../Actions/ContactListActions";

// Import components
import Contactitem from "./ContactItem/ContactItem";

const ContactList = ({ ContactList, getAllContacts }) => {

    useEffect(() => {
        apiService.fetchContactList().then(list => {
            getAllContacts(list);
        });


    }, []);


    const item = ContactList.map(listItem => {
        return (
            <Contactitem key={listItem.Id}
                {...listItem} />
        )
    });
    return (
        <section>
            {item.length > 0 ? item : <p className="emptyList">Contact list is empty.</p>}
        </section>
    )
}

const mapStateToProps = ({ ContactListReducer }) => {

    console.log("mapStateToProps", ContactListReducer)
    const { ContactList } = ContactListReducer;
    return { ContactList }
}

const mapDispatchToProps = {
    getAllContacts
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);