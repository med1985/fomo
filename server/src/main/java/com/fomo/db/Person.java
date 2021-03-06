package com.fomo.db;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.voodoodyne.jackson.jsog.JSOGGenerator;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@JsonIdentityInfo(generator=JSOGGenerator.class)
public class Person {
    @Id @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private String name;
    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "people")
    private Set<Event> events = new HashSet<>();
    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "people")
    private Set<Group> groups = new HashSet<>();
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn
    @JsonIgnore
    private Set<Response> responses = new HashSet<>();
    @Column(unique = true)
    private String fbId;

    public Person() {}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Event> getEvents() {
        return events;
    }

    public void setEvents(Set<Event> events) {
        this.events = events;
    }

    public Set<Group> getGroups() {
        return groups;
    }

    public void setGroups(Set<Group> groups) {
        this.groups = groups;
    }

    public Set<Response> getResponses() {
        return responses;
    }

    public void setResponses(Set<Response> responses) {
        this.responses = responses;
    }

    public String getFbId() {
        return fbId;
    }

    public void setFbId(String fbId) {
        this.fbId = fbId;
    }

    public long getId() {
        return id;
    }

    @Override
    public String toString() {
        return "Person{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", events=" + events +
                ", groups=" + groups +
                ", responses=" + responses +
                ", fbId='" + fbId + '\'' +
                '}';
    }
}
