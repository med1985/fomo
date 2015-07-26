package com.fomo.db.dao;

import com.fomo.auth.FbUser;
import com.fomo.db.Person;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.Query;
import org.hibernate.SessionFactory;

public class PersonDao extends AbstractDAO<Person> {
    public PersonDao(SessionFactory sessionFactory) {
        super(sessionFactory);
    }

    public Person create(Person person) {
        return persist(person);
    }
    public Person get(FbUser id) {
        return get(id.getId());
    }
    public Person get(String fbId) {
        Query query = currentSession().createQuery("from Person p where p.fbId = ?");
        return super.uniqueResult(query.setString(0, fbId));
    }
}
