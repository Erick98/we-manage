import React, { Component } from 'react';
import { database,storage } from '../../../firebase';

class Profile extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            profile: {},
            userId: ''
        }
    }
    componentWillMount() {
        if(this.props.userEmail) {
            database.ref('users').orderByChild('email').equalTo(this.props.userEmail).on('child_added', snap => {
                this.setState({
                    profile: snap.val(),
                    userId: snap.key
                });
                storage.ref(snap.child('officialIdentification').val()).getDownloadURL().then((url) => {
                    this.setState({
                        officialId: url
                    });
                }).catch((error) => {
                    switch (error.code) {
                        case 'storage/object_not_found':
                            console.log("File doesn't exist")
                            break;

                        case 'storage/unauthorized':
                            console.log("User doesn't have permission to access the object")
                            break;

                        case 'storage/canceled':
                            console.log("User canceled the upload")
                            break;

                        case 'storage/unknown':
                            console.log("Unknown error occurred, inspect the server response")
                            break;
                    }
                });
            });
        }
    }
    handleChange() {
        const name = this.name.value;
        database.ref('users/' + this.state.userId).child('name').set(name);
        const lastName = this.lastName.value;
        database.ref('users/' + this.state.userId).child('lastName').set(lastName);
        const email = this.email.value;
        database.ref('users/' + this.state.userId).child('email').set(email);
        const phone = this.phone.value;
        database.ref('users/' + this.state.userId).child('phone').set(phone);
    }
    handleSubmit(e) {
        e.preventDefault();
        const officialIdentification = this.officialIdentification.files[0];
        if(officialIdentification) {
            const ext = officialIdentification.name.split('.').pop();
            const fileName = `${this.state.userId}.${ext}`;
            storage.ref('officialIdetifications').child(fileName).put(officialIdentification);
            const fileLocation = `officialIdetifications/${fileName}`;
            database.ref('users/' + this.state.userId).child('officialIdentification').set(fileLocation);
            alert('Identificación Oficial Subida')
        } else {
            alert('Selecciona un archivo')
        }
    }
    idValidator(officialId) {
        if(officialId) {
            return (
                <picture>
                    <img src={officialId} alt="Identificación Oficial" />
                </picture >
            )
        } else {
            return(
                <span>Aún no has subido tu Identificación oficial</span>
            )
        }
    }
    render() {
        const { profile } = this.state;
        
        return (
            <section className="profile">
                <h1>Configuración de Perfil</h1>
                <div className="profile__section">
                    <div className="profile__input-container">
                        <label>Nombre</label>
                        <input onChange={this.handleChange} ref={(input) => this.name = input} defaultValue={profile.name} type="text" />
                    </div>
                    <div className="profile__input-container">
                        <label>Apellido</label>
                        <input onChange={this.handleChange} ref={(input) => this.lastName = input} defaultValue={profile.lastName} type="text" />
                    </div>
                    <div className="profile__input-container">
                        <label>Email</label>
                        <input onChange={this.handleChange} disabled ref={(input) => this.email = input} defaultValue={profile.email} type="text" />
                    </div>
                    <div className="profile__input-container">
                        <label>Teléfono</label>
                        <input onChange={this.handleChange} ref={(input) => this.phone = input} defaultValue={profile.phone} type="text" />
                    </div>
                </div>
                <div className="profile__section">
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        {this.idValidator(this.state.officialId)}
                        <div className="profile__input-container">
                            <label>Subir Identificación Oficial</label>
                            <input ref={(input) => this.officialIdentification = input} type="file" />
                        </div>
                        <div className="profile__input-container">
                            <button type="submit">Subir Identificación</button>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}

export default Profile;